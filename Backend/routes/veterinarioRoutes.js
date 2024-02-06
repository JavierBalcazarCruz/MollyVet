import express from "express";
import{registrar,perfil,confirmar,autenticar} from '../controllers/veterinarioController.js';
const router = express.Router();

//Van diferentes rutas que van relacionadas a veterinario
router.post('/', registrar);
router.get('/perfil',perfil);
router.get('/confirmar/:token',confirmar);
router.post('/login', autenticar);

export default router;