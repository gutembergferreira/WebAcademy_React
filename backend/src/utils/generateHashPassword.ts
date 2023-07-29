import bcrypt from 'bcryptjs';

const generateHashPassword = async (senha: string) => {
  const rounds = parseInt(process.env.SALT_ROUNDS!);
  const salt = await bcrypt.genSalt(rounds);
  return await bcrypt.hash(senha, salt);
};

export default generateHashPassword;
