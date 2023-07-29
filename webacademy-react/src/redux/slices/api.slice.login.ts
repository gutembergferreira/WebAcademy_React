import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { configApi } from "../../constans";
import { api } from "../../services/instanceAxios";

interface ApiState {
  loading: boolean;
  data: object;
  error: string;
  isSucess: boolean;
  isAdmin: boolean;
  isAuthenticated: boolean; // Adicione essa propriedade

}

const initialState: ApiState = {
  loading: false,
  data: {},
  error: "",
  isSucess: false,
  isAdmin: false,
  isAuthenticated: false,
};

export const doLogin = createAsyncThunk(
  "api/login",
  async (dataLogin: object) => {
    const response: AxiosResponse = await api.post(
      `${configApi.apiUrl}/v1/login`,
      dataLogin,
      { withCredentials: true }
    );

    return { payload: response.data, status: response.status };
  }
);

const apiLoginSlice = createSlice({
  name: "apiLogin",
  initialState,
  reducers: {
    logout(state) {
      state = initialState;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doLogin.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.isSucess = false;
      })
      .addCase(doLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isAdmin = action.payload.payload.isAdmin;
        state.isAuthenticated = action.payload.payload.isAuthenticated;
        if (action.payload.status === 200) {
          state.isSucess = true;
        }
      })
      .addCase(doLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "";
        state.isSucess = false;
      });
  },
});
export const { logout } = apiLoginSlice.actions;
export const { reducer: apiLoginReducer } = apiLoginSlice;
export default apiLoginSlice;
