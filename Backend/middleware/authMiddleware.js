import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";

const checkAuth = async (req, res, next) => {
    let token;
    //Validar que el token este en el header 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
       console.log('si tiene el token con bearer')
    }
    //Intentará decifrar el token
    try {
        //Extraigo el token
        token = req.headers.authorization.split(' ')[1];//[0] es Bearer [1] es el token real
        const decoded = jwt.verify(token,process.env.JWT_SECRET) ;
        //El decoded obtiene el JWT y se tiene la informacion  del usuario
        req.veterinario =  await Veterinario.findById(decoded.id).select("-password -token -confirmado");
        //Se almaceno la sesion con el veterinario
        return next();
    } catch (error) {
        const e = new Error('Token no valido');
        return res.status(403).json(
            {
                msg:e.message
            });
    }
    if(!token)
    {
        const e = new Error('Token no valido o inexistente');
        res.status(403).json(
            {
                msg:e.message
            });
    }  
    next();
};
export default checkAuth;