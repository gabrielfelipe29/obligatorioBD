import { Router } from "express";
import pool from "../database/conection.js"; 
import { getPeriodo, putFecha } from "../controllers/periodos_actualizacion.controller.js";
import { addPeriodo } from "../controllers/periodos_actualizacion.controller.js";


const router = Router();

// Obtener el periodo.
router.get('/peridosActializacion', getPeriodo);

// Agregar periodo.
router.post('/peridosActializacion', addPeriodo)

// Modificar periodo.
router.put('/peridosActializacion', putFecha)

export default router;
