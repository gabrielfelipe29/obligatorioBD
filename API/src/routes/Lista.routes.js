import { Router } from "express";
import * as listaController from "../controllers/lista.controller.js";
const router = Router();

//Obtener los funcionarios no registrados
router.get('/lista/obtenerNoRegistrados', listaController.getFuncionariosNoRegistrados);

export default router