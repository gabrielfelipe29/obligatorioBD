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
        FROM funcionariosUcu
        WHERE NOT EXISTS (
          SELECT 1
          FROM funcionarios
          WHERE funcionarios.ci = funcionariosUcu.ci
        );
      `
    );

    // Liberamos la conexión
    connection.release();
    
    console.log(fields);
    res.json(rows);
    res.send();
  } catch (error) {
    res.status(500).json({ message: error.message });
    res.send();
    console.error("Error al ejecutar la consulta:", error);
  }
};
