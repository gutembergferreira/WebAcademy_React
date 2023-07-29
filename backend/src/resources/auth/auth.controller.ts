import { TiposUsuarios } from './../tipoUsuario/tipoUsuario.constants';
import { Request, Response } from 'express';
import { checkAuth, checkIsAdmin } from './auth.service';
import { SignUpDto } from './auth.types';
import {
  createUsuario,
  buscaUsuarioPorEmail,
} from '../usuario/usuario.service';

const login = async (req: Request, res: Response) => {
  const { email, senha } = req.body;
  console.log(email, senha);
  try {
    const usuario = await checkAuth({ email, senha });
    if (!usuario)
      return res.status(401).json({ msg: 'Email e/ou senha incorretos' });
    req.session.uid = usuario.id;
    res.status(200).json({
      //NEW CODE
      isAdmin: await checkIsAdmin(usuario.id),
      // ------
      msg: 'Usuário autenticado com sucesso',
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

const logout = (req: Request, res: Response) => {
  if (req.session.uid) {
    req.session.destroy((err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ msg: 'Usuario deslogado com sucesso.' });
    });
  } else {
    res.status(401).json({ msg: 'O usuário não estava logado.' });
  }
};

const signup = async (req: Request, res: Response) => {
  const usuario = req.body as SignUpDto;
  try {
    if (await buscaUsuarioPorEmail(usuario.email))
      return res
        .status(400)
        .json({ msg: 'Já existe usuário com o email informado.' });
    const newUsuario = await createUsuario({
      ...usuario,
      tipoUsuarioId: TiposUsuarios.CLIENT,
    });
    res.status(201).json(newUsuario);
  } catch (e: any) {
    res.status(500).json(e.errors);
  }
};

export default { login, logout, signup };
