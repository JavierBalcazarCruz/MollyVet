import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";
//Registrando usuario Veterinario
const registrar = async(req, res) =>{
    //Como leerlo en node
    console.log(req.body);
    
    //---Prevenir usuarios duplicados validando si uno de los emails ya existe.
    const {email, nombre} = req.body;
    //findOnde permite buscar por los diferentes atributos que existen en los registros
    const existeUsuario = await Veterinario.findOne({email})
    if(existeUsuario){
        const error = new Error('❌ Oops! Usuario ya registrado ❌');
        return res.status(400).json({msg:error.message});
    }
    //---Fin de prevenir usuarios
    try {
        //Guardar nuevo veterinario
        //Creamos la instancia de veterinario, crea un objeto
        const veterinario = new Veterinario(req.body);
        //el await  se utiliza para que espere a que termine el proceso de guardado y luego siga con lo siguiente, si hay un error se ira al catch
        //.save en mongoose ayuda a guardar o modificar el objeto
        const veterinarioGuardado = await veterinario.save();
        //Enviar email
        emailRegistro({
            email,
            nombre,
            token:veterinarioGuardado.token
        });
        
        res.json({
            msg: 'Registrando usuario'
        });
    } catch (error) {
        console.log(error);
    }  
};

const confirmar = async(req, res)=>{
    //Para leer el parametro de la url
    const {token} = req.params
    //Buscar el usuario con el token en la BD
    const usuarioConfirmar = await Veterinario.findOne({token});

    //valido que el token sea real -> Token no válido
    if(!usuarioConfirmar){
        const error = new Error('⚠️ Enlace de verificación usado o ha expirado ⚠️. Intente iniciar sesión para verificar su cuenta');
        return res.status(400).json({msg:error.message});
    }

    try {
        //Modificamos el estatus del token, cambiamos el estatus del token
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        //Almacenamos en la BD el status confirmado.
        await usuarioConfirmar.save();
        res.json({
            msg:'🐶 Bienvenido, cuenta confirmada 🐶. Da clic al botón e inicia sesión 🌟.'       
        });
    } catch (error) {
        console.log(error);
    }
  
}

//Perfil Veterinario
const perfil = (req, res) =>{
    //Se contruye la respuesta del servidor
    const {veterinario} = req;
    res.json(veterinario);
}
//Autentificar veterinario
const autenticar = async(req,res)=>{
    //Se requiere solo el password y el email para autenticar al veterinario.
    const {email,password} = req.body;
    //Primero se valida si la cuenta existe
    const usuario = await Veterinario.findOne({email});
    if(!usuario){
        const error = new Error('Usuario no existe');
        return res.status(400).json({msg:error.message});
    }

    //Despues validar que la cuenta este confirmada
    if(!usuario.confirmado){
        const error = new Error('Usuario no ha sido confirmado');
        return res.status(400).json({msg:error.message});
    }

    //Comprobar el password
    if(await usuario.comprobarPassword(password)){
        console.log(usuario);
       //Proceso de autenticación con json web token.
        //Se regresa todo el perfil del usuario, para que cuando se habra la ruta protegida exista   {auth?._id ? esa información
      
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario.id),
            

        });
    }else{
        const error = new Error('El password es incorrecto');
        return res.status(400).json({msg:error.message});
    }
    //Y despues autenticar        
}
//Valida el email del usuario
const olvidePassword = async (req,res) =>{
    const  {email} = req.body; //req.body extrae informacion del formulario
    //Validaremos si el email existe. buscara la primera coincidencia  en la base de datos., si no encuentra devuelve null
    const existeVeterinario = await Veterinario.findOne({email})
    if(!existeVeterinario)
    {
        const error = new Error('Este usuario no esta registrado en MollyVet');
        return res.status(400).json({msg:error.message});
    }
    //Si el veterinario existe, se generara un token, se enviara por email, y se buscara el token en la BD
    try {
        //se va generar el id unicocon la funcion importada de generarId.js y se guardara en la BD, se envia respuesta al usuario.
        existeVeterinario.token = generarId();
        await existeVeterinario.save();
        //Enviar email al usuario con instrucciones
        emailOlvidePassword({
            email,
            nombre: existeVeterinario.nombre,
            token: existeVeterinario.token
        });

        res.json({
            msg: 'Se ha enviado un correo electronico para restablecer tu contraseña'
        });
    } catch (error) {
        console.log(error)
    }
};
// leer el token del password 
const comprobarToken = async(req,res) =>{
    const { token } = req.params; //extrae informacion de la url
    //sebusca en la BD que sea un token valido
    const tokenValido = await Veterinario.findOne({token});
    if(tokenValido){
        //El token es valido el usuario existe
        res.json({msg:'El token es válido y el usuario existe'});
    }
    else{
        const error = new Error('Token no valido');
        return res.status(400).json({msg:error.message});
    }
};
//Almacenar el nuevo password
const nuevoPassword = async (req,res) =>{
    //Se lee el token
    const {token}  = req.params;
    //Se lee el password nuevo del usuario que escribio
    const {password}= req.body;
    //se va modificar el objeto veterinario
    //Buscara el token
    const veterinario = await Veterinario.findOne({token});
    //Si no existe el veterinario marca error
    if(!veterinario)
    {
        const error = new Error('Hubo un error');
        return res.status(400).json({msg:error.message});
    }
    //En caso que sea valido el token
    try {
       //Ya esta almacenando el nuevo password
       //Se va eliminar el token
       veterinario.token = null;
       veterinario.password= password;
       await veterinario.save();
       res.json({msg:"Contraseña cambiada con éxito"})
       console.log(veterinario)
    } catch (error) {
        console.log(error)
    }    
};
const actualizarPerfil = async (req, res) => {
    const veterinario = await Veterinario.findById(req.params.id);
    if(!veterinario){
        const error = new Error('Hubo un error');
        return res.status(400).json({msg:error.message})
    }

    const {email, nombre, telefono, web} = req.body;

    if(veterinario.email !== email){
        const existeEmail = await Veterinario.findOne({email});
        if(existeEmail){
            const error = new Error('Ese email ya se encuentra en uso, si el error persiste comunicate a soporte.');
            return res.status(400).json({msg:error.message})
        }
    }

    try {
        veterinario.nombre = nombre;
        veterinario.email = email;
        veterinario.telefono = telefono === null ? null : telefono;
        veterinario.web = web === null ? null : web;

        const veterinarioActualizado = await veterinario.save();
        res.json({veterinarioActualizado});

    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Error interno del servidor"});
    }
}

export{
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    actualizarPerfil
}