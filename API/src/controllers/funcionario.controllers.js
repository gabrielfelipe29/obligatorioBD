import pool from "../database/conection";

//Obtener todos los funcionarios.
export const getFuncionarios = async (req, res)=>{
    try {
        // Obtenemos una conexión del pool
        const connection = await pool.getConnection();

        // Realizamos la consulta
        const [rows, fields] = await connection.execute('SELECT * FROM funcionarios');

        // Liberamos la conexión
        connection.release();

        // Hacemos algo con los resultados (en este caso, los mostramos en la consola)
        console.log(fields);
        res.json(rows);
        res.send();
    } catch (error) {
        res.status(500).json({"message": error.message});
        res.send();
        console.error('Error al ejecutar la consulta:', error);
    }
}

// Función para validar si un logId existe en la tabla logins
async function logValido(logId) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute('SELECT COUNT(*) AS count FROM logins WHERE logId = ?', [logId]);
    connection.release();
    return result[0].count > 0;
}

//Agregar funcionario.
export const addFuncionario = async (req, res)=>{
    try {
        const { ci, nombre, apellido, fch_nacimiento, direccion, telefono, email, logId } = req.body;

        // Verificamos que se proporcionen los datos necesarios
        if (!ci || !nombre || !apellido || !fch_nacimiento || !direccion || !telefono || !email || !logId) {
            return res.status(400).json({ error: 'Se requieren todos los campos para agregar un funcionario.' });
        }

        if (typeof nombre === 'string' && value.trim().length > 0) {
            return res.status(400).json({ error: 'El logId proporcionado no existe en la tabla logins.' });
        }

        // Validación específica para la clave foránea logId
        const logValido = await isLogIdValid(logId);
        if (!isLogIdValid) {
            return res.status(400).json({ error: 'El logId proporcionado no existe en la tabla logins.' });
        }

        const isLogIdValid = await isLogIdValid(logId);
        if (!isLogIdValid) {
            return res.status(400).json({ error: 'El logId proporcionado no existe en la tabla logins.' });
        }
        // Otros chequeos o validaciones según tus necesidades

        // Obtenemos una conexión del pool
        const connection = await pool.getConnection();

        // Realizamos la inserción del nuevo funcionario
        const [result] = await connection.execute('INSERT INTO funcionarios (ci, nombre, apellido, fch_nacimiento, direccion, telefono, email, logId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [ci, nombre, apellido, fch_nacimiento, direccion, telefono, email, logId]);

        // Liberamos la conexión
        connection.release();

        // Respondemos con el resultado de la inserción
        res.status(201).json({ id: result.insertId, mensaje: 'Funcionario agregado correctamente.' });

    } catch (error) {
        console.error('Error al agregar el funcionario:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
}