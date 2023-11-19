/*
import pool from "../database/conection.js";





// Función para enviar correos electrónicos a funcionarios no registrados
export function enviarCorreoNoRegistrados() {

    pool.connect((err) => {
        if (err) {
          console.error('Error al conectar a la base de datos:', err);
          return;
        }
        console.log('Conexión exitosa a la base de datos');
      });
      
  const query = `
    SELECT * FROM funcionariosUcu
    WHERE ci NOT IN (SELECT ci FROM funcionarios)
  `;

  pool.query(query, (err, resultados) => {
    if (err) {
      console.error('Error al consultar funcionarios no registrados:', err);
      return;
    }

    resultados.forEach((funcionario) => {
      const mailOptions = {
        from: 'tuCorreo@gmail.com',
        to: funcionario.email,
        subject: 'Registro en el sistema',
        text: `Estimado ${funcionario.nombre}, te invitamos a registrarte en el sistema.`,
      };

      // Enviar correo electrónico
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(`Error al enviar correo a ${funcionario.email}:`, error);
        } else {
          console.log(`Correo enviado a ${funcionario.email}:`, info.response);
        }
      });
    });
  });
}

// Función para enviar correos electrónicos a funcionarios con carnets vencidos o por vencer
export function enviarCorreoCarnetSalud() {
    pool.connect((err) => {
        if (err) {
          console.error('Error al conectar a la base de datos:', err);
          return;
        }
        console.log('Conexión exitosa a la base de datos');
      });
      
  // Obtener fecha actual
  const fechaActual = new Date().toISOString().split('T')[0];

  // Consultar funcionarios con carnets vencidos o por vencer
  const query = `
    SELECT f.*, c.fch_emision, c.fch_vencimiento
    FROM funcionarios f
    LEFT JOIN carnet_salud c ON f.ci = c.ci
    WHERE (c.fch_vencimiento < '${fechaActual}' OR c.fch_vencimiento IS NULL)
       OR (c.fch_vencimiento > '${fechaActual}' AND c.fch_vencimiento < DATE_ADD('${fechaActual}', INTERVAL 7 DAY))
  `;

  pool.query(query, (err, resultados) => {
    if (err) {
      console.error('Error al consultar funcionarios con carnets:', err);
      return;
    }

    resultados.forEach((funcionario) => {
      const mailOptions = {
        from: 'tuCorreo@gmail.com',
        to: funcionario.email,
        subject: 'Carnet de Salud',
        text: `Estimado ${funcionario.nombre}, tu carnet de salud ${funcionario.fch_vencimiento ? 'está por vencer' : 'ha vencido'}.`,
      };

      // Enviar correo electrónico
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(`Error al enviar correo a ${funcionario.email}:`, error);
        } else {
          console.log(`Correo enviado a ${funcionario.email}:`, info.response);
        }
      });
    });
  });
}

*/

import { auth } from "googleapis/build/src/apis/abusiveexperiencereport";

 
const express = require("express");
const nodemailer = require("nodemailer");
const { google } = require ("googleapis");
const router = express.Router();


export const enviar = async (req, res) => {

    const CLIENT_ID = "90708539426-fa183nhdqptgra7o6mejuv6nf2srnq7n.apps.googleusercontent.com";
    const CLIENT_SECRET = "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";
    const REDIRECT_URI = "https://developers.google.com/oauthplayground";
    const REFRESH_TOKEN = "1//04b7a2zKOY9OQCgYIARAAGAQSNwF-L9Ir1ah0kAbhLxcntbL7VIUcdAU99apMRSQFlGQQ2QHOKSC-Z-XV7_ZJTuP3nv57YK4Nrm8";

    const oAuth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
    )

    oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN});

    async function sendMail(){
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
            }
           }) 
        } catch (error) {
            console.log (error)
        }
    }
}

module.exports = router;

