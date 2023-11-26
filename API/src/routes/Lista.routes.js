import { Router } from "express";
import * as listaController from "../controllers/lista.controller.js";
const router = Router();

router.get('/lista/obtenerNoRegistrados', listaController.getFuncionariosNoRegistrados);

export default router