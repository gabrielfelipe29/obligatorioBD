import pool from "../database/conection.js";   

//Obtener todos los funcionarios no registrados.
export const getFuncionariosNoRegistrados = async (req, res) => {
  try {
    // Obtenemos una conexión del pool
    const connection = await pool.getConnection();

    // Realizamos la consulta
    const [rows, fields] = await connection.execute(
        `
        SELECT *
        FROM actualizar;
      `
    );

    // Liberamos la conexión
    connection.release();

    // Hacemos algo con los resultados (en este caso, los mostramos en la consola)
    console.log(fields);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error("Error al ejecutar la consulta:", error);
  }
};
