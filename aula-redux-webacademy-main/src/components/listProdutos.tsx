import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Button } from "reactstrap";
import { deleteProduto, editProduto } from "../redux/slices/api.slice.produtos";
import { addProduto } from "../redux/slices/carrinho.slice";
import { RootState } from "../redux/store";
import { Produto } from "../redux/slices/api.slice.produtos";
import { AppDispatch } from '../redux/store';

export default function ProdutosList() {
  const dispatch: AppDispatch = useDispatch();
  const { produtos } = useSelector((state: RootState) => state.apiProduto);
  const { isAdmin, isAuthenticated } = useSelector((state: RootState) => state.apiLogin);
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);

  function inserirCarrinho(produto: Produto) {
    dispatch(addProduto(produto));
  }

  function handleEdit(produto: Produto) {
    setProdutoEditando(produto);
  }

  async function salvarEdicao() {
    if (produtoEditando) {
      // Chame a action editProduto para atualizar o produto
      try {
        await dispatch(editProduto(produtoEditando));
        setProdutoEditando(null); // Após salvar as alterações, redefine o estado do produtoEditando para null para fechar o formulário de edição
        window.location.reload(); 
      } catch (error) {
        console.error("Erro ao atualizar o produto:", error);
      }
    }
  }

  async function handleDelete(produtoId: string) {
    try {
      if (produtoId !== undefined) {
        await dispatch(deleteProduto(produtoId));
        window.location.reload();
      }
    } catch (error) {
      console.error("Erro ao excluir o produto:", error);
    }
  }

  return (
    <div>
      {isAdmin ? (
        <div>
          {produtoEditando ? (
            <div>
              {/* Formulário de edição do produto */}
              <h2>Editar Produto</h2>
              <div>
                <label htmlFor="nome">Nome:</label>
                <input
                  type="text"
                  id="nome"
                  value={produtoEditando.nome}
                  onChange={(e) =>
                    setProdutoEditando({
                      ...produtoEditando,
                      nome: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="preco">Preço:</label>
                <input
                  type="number"
                  id="preco"
                  value={produtoEditando.preco.toString()}
                  onChange={(e) =>
                    setProdutoEditando({
                      ...produtoEditando,
                      preco: parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="estoque">Estoque:</label>
                <input
                  type="number"
                  id="estoque"
                  value={produtoEditando.estoque.toString()}
                  onChange={(e) =>
                    setProdutoEditando({
                      ...produtoEditando,
                      estoque: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <Button onClick={() => salvarEdicao()}>Salvar</Button>{" "}
              <Button onClick={() => setProdutoEditando(null)}>Cancelar</Button>
            </div>
          ) : (
            <table className="table table-responsive table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Preço</th>
                  <th scope="col">Estoque</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((produto, index) => {
                  return (
                    <tr
                      key={produto.id}
                      className={produto.estoque ? "in-stock" : "out-of-stock"}
                    >
                      <th scope="row">{index + 1}</th>
                      <td>{produto.nome}</td>
                      <td>R$ {produto.preco}</td>
                      <td>{produto.estoque}</td>
                      <td>
                        <Button
                          className="btn-editar"
                          onClick={() => handleEdit(produto)}
                        >
                          Editar
                        </Button>{" "}
                        <Button
                          className="btn-excluir"
                          onClick={() => handleDelete(produto.id!)}
                        >
                          Excluir
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <div className="grid-cards" style={{ "overflow": "none" }} >
          {produtos.map((produto) => {
            return (
              <div
                key={produto.id}
                className={`card ${produto.estoque ? "in-stock" : "out-of-stock"}`}
              >
                <h4>{produto.nome}</h4>
                <p>Preço: R$ {produto.preco}</p>
                <p>Estoque: {produto.estoque}</p>
                <Button
                  className="btn-inserir-carrinho"
                  onClick={() => {
                    console.log(produto);
                    inserirCarrinho(produto);
                  }}
                  disabled={!produto.estoque}
                >
                  Inserir no Carrinho
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
