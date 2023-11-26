import { Router } from "express";
import pool from "../database/conection.js"; 
import { getCarnet } from "../controllers/carnet_salud.controllers.js";
import { putCarnet } from "../controllers/carnet_salud.controllers.js";


const router = Router();

// Obtener todos los funcionarios.
router.get('/carneSalud', getCarnet);

// Registrar un funcionario 
router.post('/carneSalud', putCarnet)

export default router;
