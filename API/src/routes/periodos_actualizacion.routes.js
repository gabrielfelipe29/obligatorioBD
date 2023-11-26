import { Router } from "express";
import pool from "../database/conection.js"; 
import { getPeriodo } from "../controllers/periodos_actualizacion.controller.js";
import { addPeriodo } from "../controllers/periodos_actualizacion.controller.js";


const router = Router();

// Obtener el periodo.
router.get('/peridosActializacion', getPeriodo);

// Modificar el periodo
router.post('/peridosActializacion', addPeriodo)

export default router;
