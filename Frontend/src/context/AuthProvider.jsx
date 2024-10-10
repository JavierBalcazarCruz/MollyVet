//Los providers es donde nace todo ele stado global de la aplicacion
//Sera la fuente de los datos del State Global
import { useState, useEffect, createContext, useMemo } from 'react';
import clienteAxios from '../config/axios';

const AuthContext = createContext();

//Será un componente padre, que tendrá como hijos a todos los componentes de nuestra app,
//AuthProvider retornara el context, fue englobado en el app.jsx en las rutas,
//children es un prop

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);

    //Cuando cargue la app revise si el usuario esta autenticado o no
    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('apv_token');
            if (!token){
                setCargando(false);
                return;
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };
            try {
                //Aquí se setea el perfil del usuario
                const { data } = await clienteAxios('/veterinarios/perfil', config);
                setAuth(data);
            } catch (error) {
                setAuth({});
                console.log(error.response.data.msg);
            }
            setCargando(false);
        };
        autenticarUsuario();
    }, []);

   // const authValue = useMemo(() => ({ auth, setAuth, cargando}), [auth, cargando ]);
   
    const cerrarSesion = () =>{
        localStorage.removeItem('apv_token');
        setAuth({});
    }

    //Actualiza el perfil del médico
    const actualizaPerfil = async datos =>{
        const token = localStorage.getItem('apv_token');
        if (!token) {
            setCargando(false);
            return;
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        try {
            const url = `/veterinarios/perfil/${auth._id}`;
            const { data } = await clienteAxios.put(url , datos, config);
            console.log(data)
         //   setAuth(data);
        //    return data;
            return{
                msg:'Almacenado correctamente'
            }
        } catch (error) {
          return{
            msg: error.response.data.msg,
            error:true
          }
        }       
    }

    //Guarda la contraseña actualizada cuando esta iniciado la sesion
    const guardarPassword = async datos =>{
        const token = localStorage.getItem('apv_token');
        if (!token) {
            setCargando(false);
            return;
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
      
        try {
            const url = `/veterinarios/actualizar-password`; //el actualizar-password esta  definido en el routes del backend
            const { data } = await clienteAxios.put(url , datos, config);
            return{
                msg: data.msg
            }
        } catch (error) {
          return{
            msg: error.response.data.msg,
            error:true
          }
        }       

    }

    const authValue = useMemo(() => ({ 
        auth, 
        setAuth, 
        cargando, 
        cerrarSesion, 
        actualizaPerfil,  // Incluimos actualizaPerfil aquí
        guardarPassword
    }), [auth, cargando]);  // Las dependencias siguen siendo las mismas

    return (
        <AuthContext.Provider 
        value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
export default AuthContext;
