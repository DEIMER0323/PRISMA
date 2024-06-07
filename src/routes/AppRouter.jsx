import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { loginSuccess } from "../Redux/userAuth/userAuthSlice";
import { auth } from "../Firebase/firebaseConfig";
import PrivateRoutes from "./privateRoutes";
import PublicRoutes from "./publicRoutes";
import movimientoForm from "../pages/mivimientoForm/movimientoForm";

const AppRouter = () => {
  const { user } = useSelector((store) => store.userAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (userCredential) => {
      if (userCredential && !user) {
        dispatch(
          loginSuccess({
            id: userCredential.uid,
            name: userCredential.displayName,
            photo: userCredential.photoURL,
            accessToken: userCredential.accessToken,
            //email: userCredential.email || null,
            // phone: userCredential.phoneNumber || null,
          })
        );
      }
    });
  }, [user, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<PrivateRoutes />}>
            <Route index element={<Home />} />
            <Route path="agregar-movimiento" element={<movimientoForm />} />
          </Route>
          <Route element={<PublicRoutes />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
