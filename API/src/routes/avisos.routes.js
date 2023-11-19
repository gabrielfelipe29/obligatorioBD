import { Router } from "express";
import pool from "../database/conection.js"; 
import cron from 'node-cron';
import { enviarCorreoCarnetSalud, enviarCorreoNoRegistrados } from "../controllers/Avisos.controller.js";
const router = Router();

// Programar la ejecución del script todos los días a las 7:00 AM
cron.schedule('0 7 * * *', () => {
    console.log('Ejecutando tareas programadas a las 7:00 AM');
    
    // Llamar a las funciones para enviar correos electrónicos
    enviarCorreoNoRegistrados();
    enviarCorreoCarnetSalud();
  });
  router.get('/avisos', enviarCorreoNoRegistrados);

export default router;