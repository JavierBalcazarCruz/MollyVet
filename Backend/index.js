import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import veterinarioRoutes from './routes/veterinarioRoutes.js';

const app = express();
app.use(express.json());
dotenv.config();

conectarDB();
console.log('***')
console.log(process.env.MONGO_URI);

//Cuando visitemos esa url, va llamar ese routing
app.use("/api/veterinarios", veterinarioRoutes);


//Si no existe el puerto 4000 lo va asignar
const PORT = process.env.PORT || 4000; 

//Puerto 4000 ejecuta el backend
app.listen(PORT, ()=>{ 
    console.log("Server is running on port "+PORT);
});