import { Router } from "express";
import { login } from "../controllers/funcionario.controllers.js";
import { get } from "../controllers/logins.controllers.js";

const router = Router();

router.post("/login", login);

router.get("/get", get);

export default router;
    