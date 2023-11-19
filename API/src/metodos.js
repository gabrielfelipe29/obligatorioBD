export function isNullOrEmpty(value) {
  return value === null || value === undefined || value === "";
}

export function avoidSQLInjection(string) {
  if(!onlyNumbers(string)){
      if (string.includes('--')) {
          return false;
      }else if (string.toLowerCase().includes('drop')) {
          return false;
      }else if (string.toLowerCase().includes('table')) {
          return false;
      }else{
          return true;
      }  
  }else 
      return true;        
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