import express from "express";
import{registrar,perfil} from '../controllers/veterinarioController.js';
const router = express.Router();

//Van diferentes rutas que van relacionadas a veterinario
router.post('/', registrar);

router.get('/perfil',perfil )


export default router;