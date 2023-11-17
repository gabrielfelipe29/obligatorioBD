import pool from "../database/conection.js";

//Obtener todos los funcionarios.
export const getAgenda = async (req, res)=>{
    try {
        // Obtenemos una conexión del pool
        const connection = await pool.getConnection();

        // Realizamos la consulta
        const [rows, fields] = await connection.execute('SELECT * FROM agenda');

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

//Expresiones regulares utilizadas:

const nameRegex = /^[a-zA-Z\s]+$/;
const ciRegex = /^\d{6,8}$/;

// Funciones para validar los datos pasados por parametro

function avoidSQLInjection(string) {
    if (string.includes('--')) {
        return false;
    }else if (string.toLowerCase().includes('drop')) {
        return false;
    }else if (string.toLowerCase().includes('table')) {
        return false;
    }else{
        return true;
    }  
}

async function logIsValid(logId) {  // Esta función debe ser asincrónica ya que debe hacer una consulta a la tabla de login
    if (avoidSQLInjection(logId)){
        const connection = await pool.getConnection();
        const [result] = await connection.execute('SELECT COUNT(*) AS count FROM logins WHERE logId = ?', [logId]);
        connection.release();
        return result[0].count === 0;
    }
    return true;
}

function onlyNumbers(s) {
    return /^\d+$/.test(s);
}

function dateValidator(fecha) {
    // Expresión regular para el formato "aaaa-mm-dd"
    var regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(fecha);
}


// Obtener fecha de una persona
export const addFecha = async (req, res)=>{
    try {
        const { ci } = req.body;

        // Verificamos que se proporcionen los datos necesarios, las siguientes partes validan el formato de los datos y también evitan la inyección sql

        if (!ci) {
            return res.status(400).json({ error: 'Se requieren todos los campos para agregar un funcionario.'});
        }

        if (onlyNumbers(ci)) {
            return res.status(400).json({ error: 'El formato de los datos es erroneo.' });
        }

        if(!avoidSQLInjection(ci)){
            return res.status(400).json({ error: 'La inyección sql no esta permitida.' });
        }

        // Obtenemos una conexión del pool
        const connection = await pool.getConnection();

        // Realizamos la inserción del nuevo funcionario
        const [result] = await connection.execute('SELECT fch_agenda FROM agenda WHERE ci = ?;', [ci]);

        // Liberamos la conexión
        connection.release();

        // Respondemos con el resultado de la inserción
        res.status(201).json({ id: result.insertId, mensaje: 'Funcionario agregado correctamente.' });

    } catch (error) {
        console.error('Error al obtener las fechas: ', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
}

// Agendar una fecha 
export const getFecha = async (req, res)=>{
    try {
        const { ci, fecha } = req.body;

        // Verificamos que se proporcionen los datos necesarios, las siguientes partes validan el formato de los datos y también evitan la inyección sql

        if (!ci || !fecha) {
            return res.status(400).json({ error: 'Se requiere el campo de ci para identificar al empleado.' });
        }

        if (onlyNumbers(ci)) {
            return res.status(400).json({ error: 'El formato de los datos es erroneo.' });
        }

        if(!avoidSQLInjection(ci)){
            return res.status(400).json({ error: 'La inyección sql no esta permitida.' });
        }

        if(!dateValidator(fecha)){
            return res.status(400).json({ error: 'El formato de la fecha es incorrecto.' });
        }

        // Obtenemos una conexión del pool
        const connection = await pool.getConnection();

        // Realizamos la inserción del nuevo funcionario
        const [result] = await connection.execute('INSERT INTO agenda (ci, fch_agenda) VALUES (? , ?)', [ci, fecha]);

        // Liberamos la conexión
        connection.release();

        // Respondemos con el resultado de la inserción
        res.status(201).json({ id: result.insertId, mensaje: 'Funcionario agregado correctamente.' });

    } catch (error) {
        console.error('Error al obtener las fechas: ', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
}

/*
    Se tendría que considerar el hecho de crear tablas para el login

*/