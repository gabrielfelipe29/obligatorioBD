import pool from "../database/conection.js";

function dateValidator(fecha) {
  // Expresión regular para el formato "aaaa-mm-dd" o "aaaa-mm-ddThh:mm:ss.sssZ"
  var regex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}.\d{3}Z)?$/;
  return regex.test(fecha);
}

function avoidSQLInjection(string) {
  let s = string.toString();
  if (s.includes("--")) {
    return false;
  } else if (s.toLowerCase().includes("drop")) {
    return false;
  } else if (s.toLowerCase().includes("table")) {
    return false;
  } else {
    return true;
  }
}

export const getPeriodo = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      "SELECT * FROM periodos_actualizacion ORDER BY fch_inicio DESC, fch_fin DESC LIMIT 1;"
    );
    const periodoActual = result[0];
    const ahora = new Date();
    const enPeriodo =
      ahora >= periodoActual.fch_inicio && ahora <= periodoActual.fch_fin;

    connection.release();
    res.status(200).json({
      periodo: {
        año: periodoActual.año,
        semestre: periodoActual.semestre,
        fch_inicio: periodoActual.fch_inicio,
        fch_fin: periodoActual.fch_fin,
      },
      enPeriodo,
    });
  } catch (error) {
    console.error("Error al obtener el periodo de actualización: ", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

export const addPeriodo = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const { año, semestre, fch_inicio, fch_fin } = req.body;
    const [result] = await connection.execute(
      "INSERT INTO periodos_actualizacion (año, semestre, fch_inicio, fch_fin) VALUES (?, ?, ?, ?);",
      [año, semestre, fch_inicio, fch_fin]
    );

    connection.release();
    const insercionExitosa = result.affectedRows > 0; // Verificar si la operación de inserción en la base de datos fue exitosa.

    if (insercionExitosa) {
      res
        .status(201)
        .json({
          mensaje: "Nuevo periodo de actualización insertado con éxito.",
        });
    } else {
      res
        .status(500)
        .json({
          error: "Error al insertar el nuevo periodo de actualización.",
        });
    }
  } catch (error) {
    console.error(
      "Error al insertar el nuevo periodo de actualización: ",
      error
    );
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Modificación de un periodo
export const putFecha = async (req, res) => {
  try {
    // Verificamos que se proporcionen los datos necesarios, las siguientes partes validan el formato de los datos y también evitan la inyección sql
    try {
      if (
        !dateValidator(req.body.fch_inicio) &&
        !dateValidator(req.body.fch_fin)
      ) {
        return res
          .status(400)
          .json({ error: "El formato de la fecha es incorrecto." });
      }

      let año = parseInt(req.body.año);
      let semestre = parseInt(req.body.semestre);

      if (
        !avoidSQLInjection(año) &&
        !avoidSQLInjection(semestre) &&
        !avoidSQLInjection(req.body.fch_inicio) &&
        !avoidSQLInjection(req.body.fch_fin)
      ) {
        return res
          .status(400)
          .json({ error: "La inyección sql no esta permitida." });
      }

      // Obtenemos una conexión del pool
      const connection = await pool.getConnection();

      // Realizamos la inserción del nuevo funcionario
      const [result] = await connection.execute(
        "UPDATE periodos_actualizacion SET ano = ?, semestre = ?, fch_inicio = ?, fch_fin = ?;",
        [año, semestre, req.body.fch_inicio, req.body.fch_fin]
      );

      // Liberamos la conexión
      connection.release();

      // Respondemos con el resultado de la inserción
      res.status(201).json({ mensaje: "Fecha modificada con éxito." });
    } catch (error) {
      return res
        .status(400)
        .json({ error: "El formato de los datos es erroneo." });
    }
  } catch (error) {
    console.error("Error al obtener el carnet: ", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};