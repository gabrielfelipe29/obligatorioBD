import { Router } from "express";
import pool from "../database/conection.js";
import { getFuncionarios } from "../controllers/funcionario.controllers.js";


const router = Router();

// Obtener todos los funcionarios.
router.get('/funcionarios', getFuncionarios

  /*   try {
        const result = await pool.query('select * from funcionarios');
        if(!result.lenght) 
        res.status(404)//.json({"message": "La tabla se encuentra vacia."});
        res.json(result);
        res.send();
    }  */
);

export default router;