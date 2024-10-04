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
};

//Obtener paciente especifico
const obtenerPaciente = async (req, res) => {
    const {id} = req.params;
    const paciente = await Paciente.findById(id);
    if(!paciente)
    {
       return res.status(404).json({msg:'Paciente no encontrado'});
    }
    //Validar que ese paciente fue agregado por el doctor que esta autenticado, solo el puede verlo
    //Si el medico que inicio sesion es diferente de la busqueda de el veterinario validado por el token entonces no tiene permisos
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString())
    {
        return res.json({msg: 'No tienes permiso para acceder a este paciente'});
    }
    if(paciente)
    {
        return res.json(paciente);
    }
  
}

const actualizarPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id).populate('veterinario');

    console.log('******************************');
    console.log(paciente);

    // Validaciones de permisos...
    if (!paciente) {
        return res.status(404).json({ msg: 'Paciente no encontrado' });
    }

    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.status(403).json({ msg: 'No tienes permiso para acceder a este paciente' });
    }

    if (paciente) {
        // Actualización correcta de campos
        paciente.nombreMascota = req.body.nombreMascota || paciente.nombreMascota;
        paciente.propietario = req.body.propietario || paciente.propietario;
        paciente.email = req.body.email || paciente.email;
        paciente.celular = req.body.celular || paciente.celular;
        paciente.direccion = req.body.direccion || paciente.direccion;
        paciente.telefonoCasa = req.body.telefonoCasa || paciente.telefonoCasa;
        paciente.cPostal = req.body.cPostal || paciente.cPostal;
        paciente.fechaNacimiento = req.body.fechaNacimiento || paciente.fechaNacimiento;
        paciente.color = req.body.color || paciente.color;
        paciente.colonia = req.body.colonia || paciente.colonia;
        paciente.raza = req.body.raza || paciente.raza;
        paciente.peso = req.body.peso || paciente.peso;
        paciente.especie = req.body.especie || paciente.especie;
        paciente.estado = req.body.estado || paciente.estado;
        paciente.edad = req.body.edad || paciente.edad;
        // consentimiento y veterinario generalmente no se actualizan desde el front-end

        try {
            const pacienteActualizado = await paciente.save();
            console.log('Paciente Actualizado:', pacienteActualizado);
            res.json(pacienteActualizado);
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Error al actualizar el paciente' });
        }
        }    
};













const eliminarPaciente = async (req, res) => {
        //Se va pasar el id de cada paciente
            const {id} = req.params;
            const paciente = await Paciente.findById(id);
            //Validar que ese paciente fue agregado por el doctor que esta autenticado, solo el puede verlo
            //Si el medico que inicio sesion es diferente de la busqueda de el veterinario validado por el token entonces no tiene permisos
            if(!paciente)
            {
               return res.status(404).json({msg:'Paciente no encontrado'});
            }
    
            if(paciente.veterinario._id.toString() !== req.veterinario._id.toString())
            {
                return res.json({msg: 'No tienes permiso para eliminar a este paciente'});
            }
            
            try {
                //Esto me va permitir borrar este objeto
                await paciente.deleteOne();
                return res.json({msg: 'Paciente eliminado'});
            } catch (error) {
                console.log(error);
            }    
};

export{
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
};