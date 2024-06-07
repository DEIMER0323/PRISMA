import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./userAuth/userAuthSlice";
import movimientosReducer from "./movimientos/movimientos.Slicer";

const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    movimientos: movimientosReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
