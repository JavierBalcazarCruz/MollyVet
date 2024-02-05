import Veterinario from "../models/Veterinario.js"
//Registrando usuario Veterinario
const registrar = async(req, res) =>{
    //Como leerlo en node
    console.log(req.body);
    //const {email, password,nombre} = req.body;
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

//Perfil Veterinario
const perfil = (req, res) =>{
    res.send({
        msg: 'Mostrando perfil'
    });
}


export{
    registrar,
    perfil
}