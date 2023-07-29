import { Router } from 'express';
import authRouter from '../resources/auth/auth.router';
import produtoRouter from '../resources/produto/produto.router';
import usuarioRouter from '../resources/usuario/usuario.router';
import tipoUsuarioRouter from '../resources/tipoUsuario/tipoUsuario.router';

const router = Router();

router.use('/', authRouter);
router.use('/produto', produtoRouter);
router.use('/usuario', usuarioRouter);
router.use('/tipo-usuario', tipoUsuarioRouter);

export default router;
