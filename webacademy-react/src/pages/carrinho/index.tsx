import { useDispatch, useSelector } from "react-redux";
import { ListGroup, ListGroupItem } from "reactstrap";
import NavBarCustom from "../../components/navbar";
import { RootState } from "../../redux/store";
import "./index.css";
import {
  increment,
  decrement,
  tipocarrinho,
  remove,
} from "../../redux/slices/carrinho.slice";

export default function Carrinho() {
  const produto = useSelector((state: RootState) => state.carrinho);
  const dispatch = useDispatch();

  const handleIncrement = (e: tipocarrinho) => {
    const disponivel = e.produto.estoque;
    if (e.count < disponivel) {
      dispatch(increment(e.produto));
    } else {
      alert("Quantidade máxima disponível no estoque atingida!");
    }
  };

  const handleDecrement = (e: tipocarrinho) => {
    if (e.count > 1) {
      dispatch(decrement(e.produto));
    } else {
      alert("A quantidade mínima é 1. Se desejar remover o produto, utilize o botão 'Remover'.");
    }
  };

  const handleRemove = (e: tipocarrinho) => {
    const produto = e.produto; // Extrair o objeto 'produto' do 'tipocarrinho'
    dispatch(remove(produto));
  };

  const calcularTotal = () => {
    let total = 0;
    produto.produtos.forEach((e) => {
      if (e.produto && e.produto.preco && e.count) {
        total += e.produto.preco * e.count;
      }
    });
    return total;
  };

  return (
    <div className="container">
      <div style={{ width: "100%" }}>
        <NavBarCustom />
      </div>
      <h2>CARRINHO</h2>

      <div>
        <ListGroup flush>
          {produto.produtos.map((e, index) => { // Adicionamos o 'index' como segundo parâmetro da função de mapeamento
            return (
              <table
                key={index} // Usamos o 'index' como chave única para cada elemento
                style={{ width: "900px" }}
                className="table table-responsive table-bordered"
              >
                <thead>
                  <tr style={{ textAlign: "center" }}>
                    <th scope="col">Nome</th>
                    <th scope="col">Preço</th>
                    <th scope="col">Quantidade</th>
                    <th scope="col">Remover</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ textAlign: "center" }}>
                    <td width="300px">{e.produto?.nome}</td>
                    <td width="100px">R$ {e.produto?.preco}</td>
                    <td width="120px">
                      <button
                        className="btn"
                        style={{
                          backgroundColor: "#9368c4",
                          color: "#fff",
                          cursor: "pointer",
                          marginRight: "10px",
                        }}
                        onClick={() => handleDecrement(e)}
                      >
                        -
                      </button>
                      <span>{e.count}</span>
                      <button
                        className="btn"
                        style={{
                          backgroundColor: "#9368c4",
                          color: "#fff",
                          cursor: "pointer",
                          marginLeft: "10px",
                        }}
                        onClick={() => handleIncrement(e)}
                      >
                        +
                      </button>
                    </td>
                    <td width="100px">
                      <button
                        onClick={() => handleRemove(e)}
                        style={{ backgroundColor: "red", color: "white" }}
                        className="btn"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            );
          })}
        </ListGroup>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Total da Compra: R$ {calcularTotal().toFixed(2)}</h3>
      </div>
    </div>
  );
}
