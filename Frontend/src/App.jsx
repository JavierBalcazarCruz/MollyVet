import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  AuthLayout  from './layout/AuthLayout';
import  Login  from './paginas/Login';
function App() {
  return (
    <BrowserRouter>
      {/* Definición de rutas */}
      <Routes>
        {/* Ruta principal, todas las que esten agrupadas en AuthLayout estaran agrupadas en route*/}
        <Route path="/" element={<AuthLayout/>} >
         <Route index element={<Login/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;