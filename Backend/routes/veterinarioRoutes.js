import express from "express";
const router = express.Router();

import{registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword
} from '../controllers/veterinarioController.js';
import checkAuth from '../middleware/authMiddleware.js';

//Van diferentes rutas que van relacionadas a veterinario
//área publica
router.post('/', registrar);
router.get('/confirmar/:token',confirmar);
router.post('/login', autenticar);
//Estas 3 rutas van en conjunto para el password
router.post('/olvide-password',olvidePassword); //Valida el email del usuario
router.get('/olvide-password/:token',comprobarToken);// leer el token del password
router.post('/olvide-password/:token',nuevoPassword); //Almacenar el nuevo password
//***fin de password  */
//área privada
router.get('/perfil', checkAuth, perfil);
export default router;