import { Produto } from '../../models/Produto';
import { CreateProdutoDto, UpdateProdutoDto } from './produto.types';

export const getAllProdutos = async (): Promise<Produto[]> => {
  return (await Produto.findAll()).map((p) => p.toJSON());
};

export const createProduto = async (
  produto: CreateProdutoDto,
): Promise<Produto> => {
  return await Produto.create(produto);
};

export const getProduto = async (id: string): Promise<Produto | null> => {
  return Produto.findOne({ where: { id } });
};

export const updateProduto = async (
  id: string,
  produto: UpdateProdutoDto,
): Promise<boolean> => {
  const [affectColuns] = await Produto.update(produto, { where: { id } });
  return !!affectColuns;
};

export const buscaProdutoPorNome = async (
  nome: string,
): Promise<Produto | null> => {
  return await Produto.findOne({ where: { nome } });
};

export const existeProdutocomId = async (id: string): Promise<boolean> => {
  return !!(await Produto.findOne({ where: { id } }));
};

export const deleteProduto = async (id: string): Promise<number> => {
  return await Produto.destroy({ where: { id } });
};
