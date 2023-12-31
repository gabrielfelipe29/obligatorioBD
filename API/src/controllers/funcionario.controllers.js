import e from "express";
import pool from "../database/conection.js";

//Expresiones regulares utilizadas:

const nameRegex = /^[a-zA-Z\s]+$/;
const ciRegex = /^\d{6,8}$/;

// Funciones para validar los datos pasados por parametro

function onlyNumbers(s) {
  return /^[0-9]+$/.test(s);
}

function isValidName(name) {
  return nameRegex.test(name);
}

function isValidCI(ci) {
  return ciRegex.test(ci);
}

export async function ciExists(ci) {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      "SELECT COUNT(*) AS count FROM funcionarios WHERE ci = ?",
      [ci]
    );
    connection.release();
    return result[0].count != 0;
  } catch (error) {
    console.log(error);
    return true;
  }
}

function validDate(fecha) {
  // Expresión regular para el formato "aaaa-mm-dd"
  var regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(fecha);
}

function validNumber(numero) {
  // Expresión regular para verificar que el número tiene exactamente 9 dígitos
  var regex = /^\d{9}$/;
  return regex.test(numero);
}

function isNullOrEmpty(value) {
  return value === null || value === undefined || value === "";
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

// Esta función debe ser asincrónica ya que debe hacer una consulta a la tabla de login
async function logIsValid(logId) {
  if (avoidSQLInjection(logId)) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      "SELECT COUNT(*) AS count FROM logins WHERE logId = ?",
      [logId]
    );
    connection.release();
    return result[0].count === 0;
  }
  return true;
}

// Esta función debe ser asincrónica ya que debe hacer una consulta a la tabla de funcionarios ucu
async function validCi(ci) {
  if (avoidSQLInjection(ci)) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      "SELECT COUNT(*) AS count FROM funcionariosUcu WHERE ci = ?",
      [ci]
    );
    connection.release();
    return result[0].count != 0;
  } else {
    return false;
  }
}

//Obtener todos los funcionarios.
export const getFuncionarios = async (req, res) => {
  try {
    // Obtenemos una conexión del pool
    const connection = await pool.getConnection();

    // Realizamos la consulta
    const [rows, fields] = await connection.execute(
      "SELECT * FROM funcionarios"
    );

    // Liberamos la conexión
    connection.release();

    // Hacemos algo con los resultados (en este caso, los mostramos en la consola)
    console.log(fields);
    res.json(rows);
    res.send();
  } catch (error) {
    res.status(500).json({ message: error.message });
    res.send();
    console.error("Error al ejecutar la consulta:", error);
  }
};

// Log in
export const login = async (req, res) => {
  try {
    let userid = req.body.logId;
    let contraseña = req.body.password;
    // Verificamos que se proporcionen los datos necesarios, las siguientes partes validan el formato de los datos y también evitan la inyección sql

    if (isNullOrEmpty(userid) || isNullOrEmpty(contraseña)) {
      return res.status(400).json({
        error: "Se requieren todos los campos para loguearse.",
      });
    }

    const connection = await pool.getConnection();

    // Realizamos la inserción del nuevo funcionario

    const [result] = await connection.query(
      "select r.rol from rol r left join logins l on l.logId = r.logId where l.logId=? and l.password=md5(?)",
      [userid, contraseña]
    );

    //FALTA MANDAR EL TOKEN

    if (result[0]) {
      res.status(200).json({
        tipo: result[0].rol,
      });
      //existe
    } else {
      //no existe
      res.status(400).json({
        error: "Usuario no existe",
      });
    }

    //ver si el result es verdadero o no

    // Liberamos la conexión
    connection.release();

    // Respondemos con el token y el rol que es
  } catch (error) {
    console.error("Error al hacer login:", error);
    res.status(500).json({ error: "Error interno del servidor.aasa" });
  }
};

export function add(req, res) {
  console.log(req);
}

//Registrar a un funcionario.
export const addFuncionario = async (req, res) => {
  try {
    // Verificamos que se proporcionen los datos necesarios, las siguientes partes validan el formato de los datos y también evitan la inyección sql

    if (
      !req.body.ci ||
      !req.body.nombre ||
      !req.body.apellido ||
      !req.body.fch_nacimiento ||
      !req.body.direccion ||
      !req.body.telefono ||
      !req.body.email ||
      !req.body.logId
    ) {
      return res.status(400).json({
        error: "Se requieren todos los campos para agregar un funcionario.",
      });
    }

    if (
      typeof req.body.nombre === "string" &&
      req.body.nombre.trim().length === 0
    ) {
      return res
        .status(400)
        .json({ error: "El nombre no puede ser una cadena vacía." });
    }

    // Evacion de inyeccion sql
    if (
      !avoidSQLInjection(req.body.nombre) ||
      !avoidSQLInjection(req.body.ci) ||
      !avoidSQLInjection(req.body.apellido) ||
      !avoidSQLInjection(req.body.fch_nacimiento) ||
      !avoidSQLInjection(req.body.direccion) ||
      !avoidSQLInjection(req.body.email) ||
      !avoidSQLInjection(
        req.body.telefono || !avoidSQLInjection(req.body.logId)
      )
    ) {
      return res
        .status(400)
        .json({ error: "Se ha detectado el intento de inyección sql." });
    }

    // Validación específica del nombre
    if (!req.body.nombre.length > 0) {
      return res.status(400).json({
        error:
          "Se requiere que el nombre no sea una cadena vacía o contener caracteres no permitidos.",
      });
    }

    // Validación específica del ci
    if (!isValidCI(req.body.ci)) {
      return res.status(400).json({
        error: "Se requiere que la cédula sea un número de 6, 7 u 8 dígitos.",
      });
    }

    // Validación específica del apellido
    if (!req.body.apellido.length > 0) {
      return res.status(400).json({
        error: "Se requiere que el apellido tenga un formato valido.",
      });
    }

    // Validación específica de la fecha de nacimineto
    if (
      !req.body.fch_nacimiento.length > 0 &&
      validDate(req.body.fch_nacimiento)
    ) {
      return res.status(400).json({
        error:
          "Se requiere que la fecha de nacimiento tenga un formato valido.",
      });
    }

    // Validación específica de la dirección
    if (!req.body.direccion.length > 0) {
      return res.status(400).json({
        error: "Se requiere que el dirección tenga un formato valido.",
      });
    }

    // Validación específica del telefono
    if (!validNumber(req.body.telefono)) {
      return res.status(400).json({
        error: "Se requiere que el teléfono tenga un formato valido.",
      });
    }

    // Validación específica del email QUE CARAJO HACE ESTO?
    const v = await isValidCI(req.body.ci);
    if (!v) {
      return res.status(400).json({
        error:
          "Se requiere que el funcionario este en la planilla de la institución.",
      });
    }

    // Validación específica del logId
    const va = await logIsValid(req.body.logId);
    if (!va) {
      return res
        .status(400)
        .json({ error: "El usuario elegido ya se encuentra ocupado." });
    }

    const ciValida = await validCi(req.body.ci);

    if (!ciValida) {
      return res
        .status(400)
        .json({ error: "La CI debe pertenecer a la tabla funcionariosUcu." });
    }

    const ciExiste = await ciExists(req.body.ci);

    if (ciExiste) {
      return res
        .status(400)
        .json({
          error:
            "Ya existe un usuario registrado con esta CI.",
        });
    }
    // Obtenemos una conexión del pool
    const connection = await pool.getConnection();

    // Realizamos la inserción del nuevo funcionario
    const [result1] = await connection.execute(
      "INSERT INTO logins (logId, password) VALUES (?, md5(?))",
      [req.body.logId, req.body.contraseña]
    );
    const [result2] = await connection.execute(
      "INSERT INTO funcionarios (ci, nombre, apellido, fch_nacimiento, direccion, telefono, email, logId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        req.body.ci,
        req.body.nombre,
        req.body.apellido,
        req.body.fch_nacimiento,
        req.body.direccion,
        req.body.telefono,
        req.body.email,
        req.body.logId,
      ]
    );
    //Actualizo los datos del funcionario en funcionarioUcu
    const [result5] = await connection.execute(
      "update funcionariosUcu set nombre=?, apellido=?, fch_nacimiento=?, direccion=?, telefono=?, email=? where ci=?",
      [
        req.body.nombre,
        req.body.apellido,
        req.body.fch_nacimiento,
        req.body.direccion,
        req.body.telefono,
        req.body.email,
        req.body.ci,
      ]
    );

    //verificar si carne es si o no y apartir de eso agregarle el carne o no
    if (req.body.carne == "si") {
      const [result3] = await connection.execute(
        "INSERT INTO carnet_salud (ci, fch_emision, fch_vencimiento, comprobante) VALUES (?, ?, ?, ?)",
        [
          req.body.ci,
          req.body.fch_emision,
          req.body.fch_vencimiento,
          req.body.comprobante,
        ]
      );
    }
    const [result4] = await connection.execute(
      "Insert into rol (logId, rol) values (?, ?);",
      [req.body.logId, "funcionario"]
    );

    // Liberamos la conexión
    connection.release();

    // Respondemos con el resultado de la inserción
    res.status(201).json("Registro realizado correctamente");
  } catch (error) {
    console.error("Error al agregar el funcionario:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};
