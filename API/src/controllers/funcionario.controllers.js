import pool from "../database/conection.js";

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

//Expresiones regulares utilizadas:

const nameRegex = /^[a-zA-Z\s]+$/;
const ciRegex = /^\d{6,8}$/;

// Funciones para validar los datos pasados por parametro

function avoidSQLInjection(string) {
    if (string.includes('-')) {
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

function isValidName(name) {
    return nameRegex.test(name);
}

function isValidCI(ci) {
    return ciRegex.test(ci);
}


// Log in

//Registrar a un funcionario.
export const addFuncionario = async (req, res)=>{
    try {
        const { ci, nombre, apellido, fch_nacimiento, direccion, telefono, email, logId, contraseña} = req.body;

        // Verificamos que se proporcionen los datos necesarios, las siguientes partes validan el formato de los datos y también evitan la inyección sql

        if (!ci || !nombre || !apellido || !fch_nacimiento || !direccion || !telefono || !email || !logId) {
            return res.status(400).json({ error: 'Se requieren todos los campos para agregar un funcionario.' });
        }

        if (typeof nombre === 'string' && nombre.trim().length === 0) {
            return res.status(400).json({ error: 'El nombre no puede ser una cadena vacía.' });
        }

        // Validación específica para la clave foránea logId
        

        // Validación específica del nombre
        if (!isValidName(nombre)) {
            return res.status(400).json({ error: 'Se requiere que el nombre no sea una cadena vacía o contener caracteres no permitidos.' });
        }

        // Validación específica del ci
        if (!isValidCI(ci)) {
            return res.status(400).json({ error: 'Se requiere que la cédula sea un número de 6, 7 u 8 dígitos.' });
        }

        
        

        // Validación específica del apellido

        // Validación específica de la fecha de nacimineto

        // Validación específica de la dirección 

        // Validación específica del telefono

        // Validación específica del email

        // Otros chequeos o validaciones según tus necesidades

        // Obtenemos una conexión del pool
        const connection = await pool.getConnection();

        // Realizamos la inserción del nuevo funcionario
        const [result1] = await connection.execute('INSERT INTO logins (logId, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [logId, contraseña]);
        const [result2] = await connection.execute('INSERT INTO funcionarios (ci, nombre, apellido, fch_nacimiento, direccion, telefono, email, logId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [ci, nombre, apellido, fch_nacimiento, direccion, telefono, email, logId]);

        // Liberamos la conexión
        connection.release();

        // Respondemos con el resultado de la inserción
        res.status(201).json({ id: result1.insertId, mensaje: 'Funcionario agregado correctamente.'}, { id: result2.insertId, mensaje: 'Funcionario agregado correctamente.'});

    } catch (error) {
        console.error('Error al agregar el funcionario:', error);
        res.status(500).json({ error: 'Error interno del servidor.aasa' });
    }
}