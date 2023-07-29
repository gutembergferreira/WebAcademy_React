import { Request, Response } from 'express';
import {
  getAllUsuarios,
  buscaUsuarioPorId,
  buscaUsuarioPorEmail,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from './usuario.service';
import { CreateUsuarioDto } from './usuario.types';

const index = async (req: Request, res: Response) => {
  try {
    const usuarios = await getAllUsuarios();
    res.status(200).json(usuarios);
  } catch (e) {
    res.status(500).json(e);
  }
};

const create = async (req: Request, res: Response) => {
  const usuario = req.body as CreateUsuarioDto;
  try {
    if (await buscaUsuarioPorEmail(usuario.email))
      return res
        .status(400)
        .json({ msg: 'Já existe um usuário com o email informado.' });
    const newUsuario = await createUsuario(usuario);
    res.status(201).json(newUsuario);
  } catch (e: any) {
    res.status(500).json(e.errors);
  }
};

const read = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const usuario = await buscaUsuarioPorId(id);
    if (!usuario) return res.status(400).json({ msg: 'Usuário não existe.' });
    res.status(200).json(usuario);
  } catch (e) {
    res.status(500).json(e);
  }
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = req.body;
  try {
    if (!(await buscaUsuarioPorId(id)))
      return res.status(400).json({ msg: 'Usuário não existe.' });
    await updateUsuario(id, usuario);
    res.status(200).json({ msg: 'Usuário atualizado com sucesso.' });
  } catch (e) {
    res.status(500).json(e);
  }
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!(await buscaUsuarioPorId(id)))
      return res.status(400).json({ msg: 'Usuário não existe.' });
    await deleteUsuario(id);
    res.status(200).json({ msg: 'Usuário deletado com sucesso.' });
  } catch (e) {
    res.status(500).json(e);
  }
};

export default { index, create, read, update, remove };
