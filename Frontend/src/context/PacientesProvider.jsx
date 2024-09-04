import { createContext, useState, useEffect, Children } from "react";
import clienteAxios from '../config/axios';

//Este se importa y se crea el hook PacientesProviders 
const PacientesContext = createContext();
//Todas las modificaciones del state van a residir  dentro de este context, por que aqui estan las funciones que lo modifican
//Donde vienen los datos
export const PacientesProvider = ({children}) =>{
    const [pacientes, setPacientes] = useState([]);

    //Función guardarPaciente aquí se va insertar en la api
    const guardarPaciente = async (paciente) =>{
       try {
        const token = localStorage.getItem('apv_token');
        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await clienteAxios.post('/pacientes', paciente,config);
        const { __v, ...pacienteAlmacenado } = data;
        setPacientes([pacienteAlmacenado, ...pacientes])
       } catch (error) {
        console.log(error.response.data.msg);
       }
    }



    return(
        //Van todos los componentes hijos de pacientesContext.provider, ya se pueden extraer en diferentes componentes
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    );
}
export default PacientesContext;