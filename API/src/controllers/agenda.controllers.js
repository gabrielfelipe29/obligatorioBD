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
    let s = string.toString()
    if (s.includes('--')) {
        return false;
    }else if (s.toLowerCase().includes('drop')) {
        return false;
    }else if (s.toLowerCase().includes('table')) {
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

async function verifyUcuWorker(ci) {  // Esta función debe ser asincrónica ya que debe hacer una consulta a la tabla de login
    const connection = await pool.getConnection();
    const [result] = await connection.execute('SELECT COUNT(*) AS count FROM funcionariosUcu WHERE logId = ?', [logId]);
    connection.release();
    return result[0].count === 0;
}

function onlyNumbers(s) {
    return /^[0-9]+$/.test(s);
}

function dateValidator(fecha) {
    // Expresión regular para el formato "aaaa-mm-dd" o "aaaa-mm-ddThh:mm:ss.sssZ"
    var regex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}.\d{3}Z)?$/;
    return regex.test(fecha);
}



// Obtener fecha de una persona
export const getFecha = async (req, res)=>{
    try {

        // Verificamos que se proporcionen los datos necesarios, las siguientes partes validan el formato de los datos y también evitan la inyección sql

        if (!req.body.ci) {
            return res.status(400).json({ error: 'Se requieren todos los campos para agregar un funcionario.'});
        }

        try {
            let cedula = parseInt(req.body.ci)
        } catch (error) {
            return res.status(400).json({ error: 'El formato de los datos es erroneo.' });
        }

        // Obtenemos una conexión del pool
        const connection = await pool.getConnection();

        // Realizamos la inserción del nuevo funcionario
        const [result] = await connection.execute('SELECT fch_agenda FROM agenda WHERE ci = ?;', [req.body.ci]);

        // Liberamos la conexión
        connection.release();

        // Respondemos con el resultado de la consulta
        res.status(200).json({ fechas: result });

    } catch (error) {
        console.error('Error al obtener las fechas: ', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
}

// Agendar una fecha 
export const addFecha = async (req, res)=>{
    try {

        // Verificamos que se proporcionen los datos necesarios, las siguientes partes validan el formato de los datos y también evitan la inyección sql

        try {
            let cedula = parseInt(req.body.ci)
            if(!avoidSQLInjection(cedula)){
                return res.status(400).json({ error: 'La inyección sql no esta permitida.' });
            }

            if(!dateValidator(req.body.fch_agenda)){
                return res.status(400).json({ error: 'El formato de la fecha es incorrecto.' });
            }    

            // Obtenemos una conexión del pool
            const connection = await pool.getConnection();

            // Realizamos la inserción del nuevo funcionario
            const [result] = await connection.execute('INSERT INTO agenda (ci, fch_agenda) VALUES (? , ?);', [req.body.ci, req.body.fch_agenda]);

            // Liberamos la conexión
            connection.release();

            // Respondemos con el resultado de la inserción
            res.status(201).json({ id: result.insertId, mensaje: 'Fecha agregada correctamente.' });

        } catch (error) {
            return res.status(400).json({ error: 'El formato de los datos es erroneo.' });
        }
    } catch (error) {
        console.error('Error al obtener las fechas: ', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
}


/*
    Se tendría que considerar el hecho de crear tablas para el login

*/