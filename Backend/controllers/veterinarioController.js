import Veterinario from "../models/Veterinario.js"
//Registrando usuario Veterinario
const registrar = async(req, res) =>{
    //Como leerlo en node
    console.log(req.body);
    
    //---Prevenir usuarios duplicados validando si uno de los emails ya existe.
    const {email} = req.body;
    //findOnde permite buscar por los diferentes atributos que existen en los registros
    const existeUsuario = await Veterinario.findOne({email})
    if(existeUsuario){
        const error = new Error('Usuario ya registrado');
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

    //valido que el token sea real
    if(!usuarioConfirmar){
        const error = new Error('Token no válido');
        return res.status(400).json({msg:error.message});
    }

    try {
        //Modificamos el estatus del token, cambiamos el estatus del token
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        //Almacenamos en la BD el status confirmado.
        await usuarioConfirmar.save();
        res.json({
            msg:'Usuario confirmando correctamente...'       
        });
    } catch (error) {
        console.log(error);
    }
  
}

//Perfil Veterinario
const perfil = (req, res) =>{
    res.send({
        msg: 'Mostrando perfil'
    });
}
//Autentificar veterinario
const autenticar = (req,res)=>{
    //Se requiere solo el password y el email para autenticar al veterinario.
    //Primero se valida si la cuenta existe

    //Despues validar que la cuenta este confirmada

    //Despues que su password este bien escrito

    //Y despues autenticar
    
    res.json({
        msg: 'Autentificado'
    });
}

export{
    registrar,
    perfil,
    confirmar,
    autenticar
}