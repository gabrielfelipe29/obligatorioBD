import { Router } from "express";
import pool from "../database/conection.js";

const router = Router();

// Obtener todos los funcionarios.
router.get('/funcionarios', async (req, res)=>{


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

  /*   try {
        const result = await pool.query('select * from funcionarios');
        if(!result.lenght) 
        res.status(404)//.json({"message": "La tabla se encuentra vacia."});
        res.json(result);
        res.send();
    }  */
});

export default router;