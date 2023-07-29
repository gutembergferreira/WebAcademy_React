import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Produto } from "./api.slice.produtos";

export type tipocarrinho = {
  produto: Produto;
  count: number;
};

export const carrinhoSlice = createSlice({
  name: "carrinhoSlice",
  initialState: {
    produtos: [] as tipocarrinho[],
  },

  reducers: {
    addProdutoNome(state, action) {
      state.produtos.push(action.payload);
      return state;
    },

    addProduto(state, action) {
      let flag: boolean = false;

      state.produtos.forEach((e) => {
        if (e.produto.id === action.payload.id) {
          e.count++;
          flag = true;
        }
      });

      if (!flag) {
        const novoProduto: tipocarrinho = {
          produto: action.payload,
          count: 1,
        };
        state.produtos.push(novoProduto);
      }
      return state;
    },
    increment(state, action: PayloadAction<Produto>) {
      const idToIncrement = action.payload?.id;
      if (idToIncrement) {
        const index = state.produtos.findIndex((e) => e.produto?.id === idToIncrement);
        if (index !== -1) {
          state.produtos[index].count++;
        }
      }
    },
    decrement(state, action: PayloadAction<Produto>) {
      const idToDecrement = action.payload?.id;
      if (idToDecrement) {
        const index = state.produtos.findIndex((e) => e.produto?.id === idToDecrement);
        if (index !== -1 && state.produtos[index].count > 1) {
          state.produtos[index].count--;
        }
      }
    },
    remove(state, action: PayloadAction<Produto>) {
      const idToRemove = action.payload?.id;
      if (idToRemove) {
        state.produtos = state.produtos.filter((e) => e.produto?.id !== idToRemove);
      }
    },
  },
});

export const { addProdutoNome, increment, decrement, remove, addProduto } = carrinhoSlice.actions;
export default carrinhoSlice.reducer;
