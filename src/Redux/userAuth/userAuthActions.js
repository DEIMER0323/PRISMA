import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import {LoginFail, loginSuccess,LoginRequest, logout} from "./userAuthSlice"
import { auth } from "../../Firebase/firebaseConfig";


export const actionRegisterWithEmailAndPassword = ({
  email,
  password,
  name = null,
  photo = null,
}) => {
  return async (dispatch) => {
    dispatch(LoginRequest());
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
      dispatch(
        loginSuccess({
          id: user.uid,
          name: name,
          email: email,
          accessToken: user.accessToken,
          photo: photo
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(LoginFail(error.message));
    }
  };
};
export const actionLoginWithEmailAndPassword = ({email,password}) =>{
  return async(dispatch) =>{
    dispatch(LoginRequest());

    try {
      const {user} = await signInWithEmailAndPassword(auth,email,password);
      dispatch(loginSuccess({
        id: user.uid,
        name: user.displayName,
        photo: user.photoURL,
        accessToken: user.accessToken
      }));
    } catch (error) {
      console.error(error);
      dispatch(LoginFail(error.message));

      
    }
  }
}
export const actionLogout = () => {
  return async(dispatch) =>{
    dispatch(loginSuccess())
    try {
      await signOut(Auth);
      dispatch(logout());
    } catch (error) {
      console.error(error);
      dispatch(LoginFail(error.message));
      
    }

  }
}
