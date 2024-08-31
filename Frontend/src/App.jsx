import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import  AuthLayout  from './layout/AuthLayout';
import  RutaProtegida  from './layout/RutaProtegida';

import  Login  from './paginas/Login'; 
import  Registrar  from './paginas/Registrar';
import  OlvidePassword  from './paginas/OlvidePassword';
import  NuevoPassword from './paginas/NuevoPassword';
import  HomeScreen from './paginas/HomeScreen';
import  ConfirmarCuenta  from './paginas/ConfirmarCuenta';
import  RegistroCliente  from './paginas/RegistroCliente';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        {/* Definición de rutas */}
        <Routes>
          {/* Ruta principal, todas las que esten agrupadas en AuthLayout estaran agrupadas en route*/}
          <Route path="/" element={<AuthLayout/>} >
            <Route index element={<Login/>}/>
            <Route path="registrar" element={<Registrar/>}/>
            <Route path="olvide-password" element={<OlvidePassword/>}/>
            <Route path="olvide-password/:token" element={<NuevoPassword/>}/>
            <Route path="confirmar/:id" element={<ConfirmarCuenta/>}/>
          </Route>

           {/* Definicion de rutas privadas*/}
          <Route path="/admin" element={<RutaProtegida/>} >
            <Route index element={<HomeScreen/>}/>
            <Route path="registro-cliente" element={<RegistroCliente/>}/>

          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;