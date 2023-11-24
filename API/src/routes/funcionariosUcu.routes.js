import { Router } from "express";
import pool from "../database/conection.js"; 
import { getFuncionarios, addFuncionario, add } from "../controllers/funcionario.controllers.js"

const router = Router();

// Mandar recordatorio via mail a los fucnionarios 
router.get('/funcionarios', getFuncionarios);

// Registrar un funcionario 
router.post('/funcionario', addFuncionario)


export default router;