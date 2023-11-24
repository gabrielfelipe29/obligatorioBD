
import { Router } from "express";
import { encontrarFuncionariosNoRegistrados} from "../metodos.js";
import pool from "../database/conection.js"; 
import cron from 'node-cron'; 
import { sendMail } from "../controllers/Avisos.controller.js";
const router = Router();

 async function sendMail(to, subject, text){ 
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            type: "OAuth2",
            user: "aplicacion631@gmail.com",
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken
        }});
        
        const mailOptions = {
        form: "Pagina wb Nodemailer <aplicacion631@gmail>",
        to: to,
        subject: subject,
        text: text
        } 

        const result = await transporter.sendMail(mailOptions);
        return result;

    } catch (error) {
        console.log (error)
    }
} 

router.get('/avisos', sendMail(req));

// Programar la ejecución del script todos los días a las 7:00 AM
cron.schedule('0 7 * * *', () => {
    console.log('Ejecutando tareas programadas a las 7:00 AM');
    const notregistred = encontrarFuncionariosNoRegistrados()
    
    notregistred.forEach(funcionario => {
        sendMail(funcionario.email, "Debe registrarse en la aplicación", "Es importante que se registre")
    });
});
 

export default router;

