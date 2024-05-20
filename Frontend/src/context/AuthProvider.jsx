//Los providers es donde nace todo ele stado global de la aplicacion
//Sera la fuente de los datos del State Global
import {useState, useEffect, createContext} from 'react';

const AuthContext = createContext()

//Será un componente padre, que tendrá como hijos a todos los componentes de nuestra app,
//AuthProvider retornara el context, fue englobado en el app.jsx en las rutas,
//children es un prop

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    return(
        <AuthContext.Provider
            value = {{
                auth,
                setAuth
            } }
        
        >
            {children}
        </AuthContext.Provider>
    );
}

export{
    AuthProvider
}

export default AuthContext