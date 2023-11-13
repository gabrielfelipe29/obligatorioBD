import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

//Inicialización
const app = express();

//Configuración 
app.set('PORT', 3000);

//Middlewares
app.use(cors()); //Permite conectar con angular 
app.use(express.json());
app.use(morgan('dev'));

//Correr el servidor 
app.listen(app.get('PORT'), ()=>{
    console.log('El servidor se está ejecutando en el puerto', app.get('PORT'));
})