import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';

const app = express();
app.use(express.json());
dotenv.config();

conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL];
/*
var corsOptions = {
    origin: function (origin, callback) {
      if (!origin || dominiosPermitidos.indexOf(origin) !== -1) {
        //El origen es permitido
        callback(null, true)
      } else {
        callback(new Error('No permitido por CORS'));
      }
    }
  }
  app.use(cors(corsOptions));
*/

//Puedo revisar desde cualquier dispositivo 
const corsOptions = {
    origin: function (origin, callback) {
      // Permitir cualquier origen
      callback(null, true);
    }
  };

  app.use(cors(corsOptions));
  
//Cuando visitemos esa url, va llamar ese routing de veterinarios
app.use("/api/veterinarios", veterinarioRoutes);
//Cuando visitemos esa url, va llamar ese routing de pacientes
app.use("/api/pacientes", pacienteRoutes);


//Si no existe el puerto 4000 lo va asignar
const PORT = process.env.PORT || 4000; 

//Puerto 4000 ejecuta el backend
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});