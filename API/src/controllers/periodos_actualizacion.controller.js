import pool from "../database/conection.js";


export const getPeriodo = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [result] = await connection.execute('SELECT * FROM periodos_actualizacion ORDER BY fch_inicio DESC, fch_fin DESC LIMIT 1;');
        const periodoActual = result[0];
        const ahora = new Date();
        const enPeriodo = ahora >= periodoActual.fch_inicio && ahora <= periodoActual.fch_fin;

        connection.release();
        res.status(200).json({
            periodo: {
                año: periodoActual.año,
                semestre: periodoActual.semestre,
                fch_inicio: periodoActual.fch_inicio,
                fch_fin: periodoActual.fch_fin
            },
            enPeriodo
        });

    } catch (error) {
        console.error('Error al obtener el periodo de actualización: ', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
}

export const addPeriodo = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const { año, semestre, fch_inicio, fch_fin } = req.body;
        const [result] = await connection.execute('INSERT INTO periodos_actualizacion (año, semestre, fch_inicio, fch_fin) VALUES (?, ?, ?, ?);', [año, semestre, fch_inicio, fch_fin]);

        
        connection.release();
        const insercionExitosa = result.affectedRows > 0; // Verificar si la operación de inserción en la base de datos fue exitosa.

        if (insercionExitosa) {
            res.status(201).json({ mensaje: 'Nuevo periodo de actualización insertado con éxito.' });
        } else {
            res.status(500).json({ error: 'Error al insertar el nuevo periodo de actualización.' });
        }

    } catch (error) {
        console.error('Error al insertar el nuevo periodo de actualización: ', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
}

/*
// Obtención del perido de actualización más un booleano que indica si nos encontramos actualmente en el periodo
export const getPeriodo = async (req, res)=>{
    try {
        // Obtenemos una conexión del pool
        const connection = await pool.getConnection();

        // Realizamos la inserción del nuevo funcionario
        const [result] = await connection.execute('SELECT * FROM periodos_actualizacion ORDER BY fch_inicio DESC, fch_fin DESC LIMIT 1;');

        // Liberamos la conexión
        connection.release();

        // Respondemos con el resultado de la inserción
        res.status(201).json({ id: result.insertId, mensaje: 'Carnet obtenido con exito.' });

    } catch (error) {
        console.error('Error al obtener el carnet: ', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
}
*/