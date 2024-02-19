import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  AuthLayout  from './layout/AuthLayout';
import  Login  from './paginas/Login'; 
import  Registrar  from './paginas/Registrar';
import  OlvidePassword  from './paginas/OlvidePassword';
import  ConfirmarCuenta  from './paginas/ConfirmarCuenta';
function App() {
  return (
    <BrowserRouter>
      {/* Definición de rutas */}
      <Routes>
        {/* Ruta principal, todas las que esten agrupadas en AuthLayout estaran agrupadas en route*/}
        <Route path="/" element={<AuthLayout/>} >
          <Route index element={<Login/>}/>
          <Route path="registrar" element={<Registrar/>}/>
          <Route path="olvide-passoword" element={<OlvidePassword/>}/>
          <Route path="confirmar/:id" element={<ConfirmarCuenta/>}/>


        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;