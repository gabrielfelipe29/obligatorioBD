import { Router } from "express";
import { getFecha } from "../controllers/agenda.controllers.js";
import { addFecha } from "../controllers/agenda.controllers.js";

const router = Router();

// Obtener fecha de agenda
router.get('/agenda', getFecha);

// Registrar una fecha 
router.post('/agenda', addFecha)


export default router;