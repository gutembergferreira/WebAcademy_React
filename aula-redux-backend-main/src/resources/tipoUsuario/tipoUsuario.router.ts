import { Router } from 'express';
import tipoUsuarioController from './tipoUsuario.controller';
const router = Router();

router.get('/', tipoUsuarioController.index);

export default router;
