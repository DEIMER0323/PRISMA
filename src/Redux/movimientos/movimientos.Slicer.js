import { createSlice } from "@reduxjs/toolkit";

const movimientosSlicer = createSlice({
  name: "movimientos",
  inicialState: {
    movimientos: [],
    isLoandingMovimientos: false,
    errorMovimientos: null,
  },
  reducers: {
    movimientosRequest: (state) => {
      state.isLoandingMovimientos = true;
      state.errorMovimientos = null;
    },
    fillMovimientos: (state, action) => {
      state.movimientos = action.payload;
      state.isLoandingMovimientos = false;
      state.errorMovimientos = null;
    },
    movimientosFail: (state, action) => {
      (state.isLoandingMovimientos = false),
        (state.errorMovimientos = action.payload);
    },
    addMovimiento: (state, action) => {
      state.mo.push(action.payload);
      state.isLoandingMovimientos = false;
    },
    editMovimiento: (state, action) => {
      state.isLoandingMovimientos = false;
      state.movimientos = state.movimientos.map((item) =>
        action.payload.id == item.id ? { ...action.payload } : item
      );
    },
    deleteMovimiento: (state, action) => {
      state.isLoandingMovimientos = false;
      state.addMovimientos = state.addMovimientos.filter(
        (item) => item.id != action.payload
      );
    },
  },
});

export const {
  movimientosRequest,
  fillMovimientos,
  movimientosFail,
  addMovimiento,
  editMovimiento,
  deleteMovimiento,
} = movimientosSlicer;
export default movimientosSlicer;
