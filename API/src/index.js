import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import FuncionariosRouter from './routes/funcionarios.routes.js'

//Inicialización
const app = express();

//Configuración 
app.set('PORT', 3005);

//Middlewares
app.use(cors()); 
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use(FuncionariosRouter);

// Debuging
process.env.NODE_ENV = 'development';

//Correr el servidor 
app.listen(app.get('PORT'), ()=>{
    console.log('El servidor se está ejecutando en el puerto', app.get('PORT'));
})
/*
rm -rf node_modules
rm package-lock.json yarn.lock
npm cache clear --force
npm install
*/