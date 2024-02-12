import Paciente from "../models/Paciente.js";
const agregarPaciente = async(req, res) => {
    //Detectaremos que doctor almacena el paciente.
    const paciente = new Paciente(req.body); //enviamos la informacion del formulario, se tiene una instancia antes de almacenarlo en la bd
    //Lo almacena en el modelo 
    paciente.veterinario = req.veterinario._id;
    try {
        //Hace el guardado de la información
        const pacienteAlmacenado = await paciente.save();
        res.json(pacienteAlmacenado);
    } catch (error) {
        console.log(error)
    }
    
};

const obtenerPacientes = async (req, res) => {
    //Aqui ya consulto todos los pacientes en la BD por id del doctor
   const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario);
   res.json(pacientes);
}

export{
    agregarPaciente,
    obtenerPacientes
};