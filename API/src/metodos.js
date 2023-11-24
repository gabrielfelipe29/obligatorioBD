import pool from "./database/conection";

export function isNullOrEmpty(value) {
  return value === null || value === undefined || value === "";
}



// Métodos asíncronos (consultas a base de datos)

export async function logIsValid(logId) {
  // Esta función debe ser asincrónica ya que debe hacer una consulta a la tabla de login
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

export async function getFuncionariosUcu(logId) {
  // Esta función debe ser asincrónica ya que debe hacer una consulta a la tabla de login
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

export async function encontrarFuncionariosNoRegistrados() {
  const query = `
    SELECT *
    FROM funcionariosUcu
    WHERE NOT EXISTS (
      SELECT 1
      FROM funcionarios
      WHERE funcionarios.ci = funcionariosUcu.ci
    );
  `;

  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      return;
    }

    console.log('Funcionarios no registrados:', results);
  });
}