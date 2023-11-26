import { Router } from "express";
import pool from "../database/conection.js"; 
import { getPeriodo } from "../controllers/periodos_actualizacion.controller.js";
import { addPeriodo } from "../controllers/periodos_actualizacion.controller.js";


const router = Router();

// Obtener todos los funcionarios.
router.get('/peridosActializacion', getPeriodo);

// Registrar un funcionario 
router.post('/peridosActializacion', addPeriodo)

export default router;
