//import api from 'googleapis/build/src/apis/abusiveexperiencereport';
 
const express = require("express");
const nodemailer = require("nodemailer");
const { google } = require ("googleapis");
import { Router } from "express";
const CLIENT_ID = "90708539426-fa183nhdqptgra7o6mejuv6nf2srnq7n.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = "1//04b7a2zKOY9OQCgYIARAAGAQSNwF-L9Ir1ah0kAbhLxcntbL7VIUcdAU99apMRSQFlGQQ2QHOKSC-Z-XV7_ZJTuP3nv57YK4Nrm8";

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
)

const router = Router();


export const sendMail = async (req, res) => {
    try {
        oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN});
        const accessToken = await oAuth2Client.getAccessToken();
        const transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            type: "OAuth2",
            user: "aplicacion631@gmail.com",
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOK ,
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

        try {
            // Obtenemos una conexión del pool
            const connection = await pool.getConnection();
        
            // Realizamos la consulta
            const [rows, fields] = await connection.execute(
                `
                SELECT *
                FROM funcionariosUcu
                WHERE NOT EXISTS (
                  SELECT 1
                  FROM funcionarios
                  WHERE funcionarios.ci = funcionariosUcu.ci
                );
              `
            );
        
            // Liberamos la conexión
            connection.release();
        
            // Hacemos algo con los resultados (en este caso, los mostramos en la consola)
            console.log(fields);
            res.json(rows);
            res.send();
          } catch (error) {
            res.status(500).json({ message: error.message });
            res.send();
            console.error("Error al ejecutar la consulta:", error);
          }
    } catch (error) {
        console.log (error)
    }
}



module.exports = router;