import { Router } from "express";
import { getFecha } from "../controllers/agenda.controllers.js";
import { addFecha } from "../controllers/agenda.controllers.js";

const router = Router();

// Obtener todos los funcionarios.
router.get('/agenda', getFecha);

// Registrar un funcionario
router.post('/agenda', addFecha)


export default router;