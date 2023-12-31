import { Router } from "express";
import pool from "../database/conection.js"; 
import { getFuncionarios, addFuncionario, add } from "../controllers/funcionario.controllers.js"


const router = Router();

// Obtener todos los funcionarios.
router.get('/funcionarios', getFuncionarios);

// Registrar un funcionario 
router.post('/funcionario', addFuncionario)


export default router;
