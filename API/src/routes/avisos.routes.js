
import { Router } from "express";
//import { getFuncionariosNoRegistrados } from "../controllers/Avisos.controller.js";
const router = Router();

/*
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
*/

//router.get('/avisos/obtenerNoRegistrados', getFuncionariosNoRegistrados);



export default router;

