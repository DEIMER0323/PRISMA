import { collection } from "firebase/firestore";
import {
  fillMovimientos,
  movimientosFail,
  movimientosRequest,
} from "./movimientos.Slicer";

const COLLECTION_NAME = "movimientos";
const collectionRef = collection(tadabse, COLLECTION_NAME);

export const actionAddmovimiento = (newMovimiento) => {
  return async (dispatch) => {
    dispatch(movimientosRequest());
    try {
      const docRef = addDoc(collectionRef, newMovimiento);
      dispatch(
        fillMovimientos({
          id: docRef.id,
          ...newMovimiento,
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(movimientosFail(error.message));
    }
  };
};
