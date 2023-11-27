import express from "express";
import morgan from "morgan";
import cors from "cors";
import FuncionariosRouter from "./routes/funcionarios.routes.js";
import LoginRouter from "./routes/logins.routes.js";
import AgendaRouter from "./routes/agenda.routes.js"
import PeriodosRouter from "./routes/periodos_actualizacion.routes.js"
import CarnetRouter from "./routes/carnet_salud.routes.js"
import ListaRouter from "./routes/Lista.routes.js"

//Inicialización
const app = express();

//Configuración
app.set("PORT", 3005);

//Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use(FuncionariosRouter);
app.use(LoginRouter);
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