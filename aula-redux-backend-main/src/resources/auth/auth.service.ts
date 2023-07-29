import bcrypt from 'bcryptjs';
import { Usuario } from '../../models/Usuario';
import { LoginDto } from './auth.types';
import { TiposUsuarios } from '../tipoUsuario/tipoUsuario.constants';

export const checkAuth = async (
  credenciais: LoginDto,
): Promise<Usuario | null> => {
  const { email, senha } = credenciais;
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) return null;
  const ok = await bcrypt.compare(senha, usuario.senha);
  return ok ? usuario : null;
};

export const checkIsAdmin = async (id: string): Promise<boolean> => {
  const usuario = await Usuario.findOne({ where: { id } });
  if (!usuario) return false;
  return usuario.tipoUsuarioId === TiposUsuarios.ADMIN;
};
