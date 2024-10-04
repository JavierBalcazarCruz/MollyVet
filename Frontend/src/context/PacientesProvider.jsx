import { createContext, useState, useEffect, Children } from "react";
import clienteAxios from '../config/axios';

//Este se importa y se crea el hook PacientesProviders 
const PacientesContext = createContext();
//Todas las modificaciones del state van a residir  dentro de este context, por que aqui estan las funciones que lo modifican
//Donde vienen los datos
export const PacientesProvider = ({children}) =>{
    const [pacientes, setPacientes] = useState([]);
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
    //Cuando cargue el componente se va llamar la API para poder recuperar los datos
    useEffect(() =>{
        const obtenerPacientes = async () =>{
            try {
                const token = localStorage.getItem('apv_token');
                if (!token) return;
                const config = {
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                //Petición get para obtener los pacientes
                const { data } = await clienteAxios.get('/pacientes',config);
                //Se seteea el data en pacientes para que se pueda usar en cualquier componente
                console.log(data)
                setPacientes(data);

               } catch (error) {
                console.log(error.response.data.msg);
               }
        }
        obtenerPacientes()
    }, [])

    //Función guardarPaciente aquí se va insertar en la api
    const guardarPaciente = async (paciente) =>{

        const token = localStorage.getItem('apv_token');
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

        
            if(paciente._id){
                let id = paciente._id;
                // Va editar un paciente existente
                try {            
                    const { data } = await clienteAxios.put(`/pacientes/${id}`, paciente, config);
            
                    // Actualiza el elemento modificado en la lista
                    const pacienteActualizado = pacientes.map( pacienteState => pacienteState._id === data._id ? data : pacienteState)
                    setPacientes(pacienteActualizado);
            
                    // Si el paciente modificado es el seleccionado, actualízalo
                    if (pacienteSeleccionado && pacienteSeleccionado._id === data._id) {
                        setPacienteSeleccionado(data);
                    }
            
                } catch (error) {
                    console.log(error);
                }
            }else{
           //Dar de alta un nuevo registro
           try {       
                
            const { data } = await clienteAxios.post('/pacientes', paciente,config);
            const { __v, ...pacienteAlmacenado } = data;
            setPacientes([pacienteAlmacenado, ...pacientes])
           } catch (error) {
            console.log(error.response.data.msg);
           }
       
        }



     
    }




    return(
        //Van todos los componentes hijos de pacientesContext.provider, ya se pueden extraer en diferentes componentes
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setPacienteSeleccionado
            }}
        >
            {children}
        </PacientesContext.Provider>
    );
}
export default PacientesContext;