import { Router } from 'express';
import usuarioController from './usuario.controller';
import isAdmin from '../../middlewares/isAdmin';

const router = Router();

router.get('/', isAdmin, usuarioController.index);
router.post('/', usuarioController.create);
router.get('/:id', isAdmin, usuarioController.read);
router.put('/:id', isAdmin, usuarioController.update);
router.delete('/:id', isAdmin, usuarioController.remove);

export default router;
