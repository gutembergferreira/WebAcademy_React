import bcrypt from 'bcryptjs';
import { Usuario } from '../../models/Usuario';
import {
  CreateUsuarioDto,
  UsuarioDto,
  UpdateUsuarioDto,
} from './usuario.types';

export const getAllUsuarios = async (): Promise<UsuarioDto[]> => {
  const usuarios = await Usuario.findAll({
    attributes: [
      'id',
      'tipoUsuarioId',
      'nome',
      'email',
      'createdAt',
      'updatedAt',
    ],
  });
  return usuarios.map((u) => u.toJSON());
};

export const createUsuario = async (
  usuario: CreateUsuarioDto,
): Promise<UsuarioDto> => {
  const rounds = parseInt(process.env.SALT_ROUNDS!);
  const salt = await bcrypt.genSalt(rounds);
  const hash = await bcrypt.hash(usuario.senha, salt);
  const newUsuario = await Usuario.create({
    ...usuario,
    senha: hash,
  });
  const newUsuarioSemSenha = newUsuario.toJSON();
  delete newUsuarioSemSenha['senha'];
  return newUsuarioSemSenha;
};

export const updateUsuario = async (
  id: string,
  usuario: UpdateUsuarioDto,
): Promise<boolean> => {
  const [affectColuns] = await Usuario.update(usuario, { where: { id } });
  return !!affectColuns;
};

export const buscaUsuarioPorEmail = async (
  email: string,
): Promise<UsuarioDto | null> => {
  return await Usuario.findOne({
    attributes: [
      'id',
      'tipoUsuarioId',
      'nome',
      'email',
      'createdAt',
      'updatedAt',
    ],
    where: { email },
  });
};

export const buscaUsuarioPorId = async (
  id: string,
): Promise<UsuarioDto | null> => {
  return await Usuario.findOne({
    attributes: [
      'id',
      'tipoUsuarioId',
      'nome',
      'email',
      'createdAt',
      'updatedAt',
    ],
    where: { id },
  });
};

export const deleteUsuario = async (id: string): Promise<number> => {
  return await Usuario.destroy({ where: { id } });
};
