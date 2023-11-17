import { Router } from "express";
import { login } from "../controllers/funcionario.controllers.js";

const router = Router();

router.get("/login", login);

export default router;
