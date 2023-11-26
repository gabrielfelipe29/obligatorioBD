import express from "express";
import morgan from "morgan";
import cors from "cors";
import FuncionariosRouter from "./routes/funcionarios.routes.js";
import LoginRouter from "./routes/logins.routes.js";
import AvisosRouter from "./routes/avisos.routes.js" // tiene q ser avisos.routes.
import AgendaRouter from "./routes/agenda.routes.js"
import PeriodosRouter from "./routes/periodos_actualizacion.routes.js"
import CarnetRouter from "./routes/carnet_salud.routes.js"
import ListaRouter from "./routes/Lista.routes.js"
//jwt
//abc
//Inicialización
const app = express();
//const jwt = require("jsonwebtoken");

//Configuración
app.set("PORT", 3005);

//Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use(FuncionariosRouter);
app.use(LoginRouter);
//app.use(AvisosRouter);  
app.use(AgendaRouter);
app.use(PeriodosRouter);
app.use(CarnetRouter);
app.use(ListaRouter);

// Debuging
process.env.NODE_ENV = "development";

//Correr el servidor
app.listen(app.get("PORT"), () => {
  console.log("El servidor se está ejecutando en el puerto", app.get("PORT"));
});
/*
rm -rf node_modules
rm package-lock.json yarn.lock
npm cache clear --force
npm install
*/

//------------------------------------------------------------------------------
/*
export async function encontrarFuncionariosNoRegistrados() {
  const query = `
    SELECT *
    FROM funcionariosUcu
    WHERE NOT EXISTS (
      SELECT 1
      FROM funcionarios
      WHERE funcionarios.ci = funcionariosUcu.ci
    );
  `;

  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      return;
    }

    console.log('Funcionarios no registrados:', results);
  });
}


// Programar la ejecución del script todos los días a las 7:00 AM
cron.schedule('0 7 * * *', () => {
  console.log('Ejecutando tareas programadas a las 7:00 AM');
  const notregistred = encontrarFuncionariosNoRegistrados()
  
  notregistred.forEach(funcionario => {
      sendMail(funcionario.email, "Debe registrarse en la aplicación", "Es importante que se registre")
  });
});
*/

//-------------------------------------------------------------------------------
