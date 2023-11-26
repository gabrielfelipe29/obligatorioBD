import { Router } from "express";
import pool from "../database/conection.js"; 
import { getCarnet } from "../controllers/carnet_salud.controllers.js";
import { putCarnet } from "../controllers/carnet_salud.controllers.js";


const router = Router();

// Obtener el carnet de salud
router.get('/carneSalud', getCarnet);

// Modificar el carnet de salud
router.post('/carneSalud', putCarnet)

export default router;
