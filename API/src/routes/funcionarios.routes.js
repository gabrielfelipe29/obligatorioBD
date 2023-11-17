import { Router } from "express";
import pool from "../database/conection.js"; 
import { getFuncionarios, addFuncionario } from "../controllers/funcionario.controllers.js"


const router = Router();

// Obtener todos los funcionarios.
router.get('/funcionarios', getFuncionarios);

// Registrar un funcionario
router.post('/funcionario', addFuncionario)


export default router;

//C:\Users\bruno\Desktop\Ucu\Cuarto Semestre\Base de datos\obligatorioBD\API\src\controllers\funcionario.controllers.js



 /*   try {
        const result = await pool.query('select * from funcionarios');
        if(!result.lenght) 
        res.status(404)//.json({"message": "La tabla se encuentra vacia."});
        res.json(result);
        res.send();
    }  */