import { Request, Response } from 'express';
import { getTiposUsuarios } from './tipoUsuario.service';

const index = async (req: Request, res: Response) => {
  try {
    const tipos = await getTiposUsuarios();
    res.status(200).json(tipos);
  } catch (e) {
    res.status(500).json(e);
  }
};

export default { index };
