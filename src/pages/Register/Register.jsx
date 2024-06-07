import React, { useState } from "react";
import imagePhoto from "../../assets/photo-camera_711191.png";
import imageUser from "../../assets/user_709618.png";
import imageEmail from "../../assets/email_1159936.png";
import imagePassword from "../../assets/lock_8472244.png";
import "./register.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import fileUpload from "../../service/fileUpload";
import { useDispatch, useSelector } from "react-redux";
import { actionRegisterWithEmailAndPassword } from "../../Redux/userAuth/userAuthActions";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
//import cargando from "../../components/cargando/cargando";

const passwordRegex =
  /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;

const initialImage =
  "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isAuth, isLoading, error} = useSelector((store)=> store.userAuth);
  const [image, setImage] = useState(initialImage);
  const [file, setFile] = useState(null);

  const handleChangeFile = (event) => {
    const fileItem = event.target.files[0];
    setFile(fileItem);
    setImage(URL.createObjectURL(fileItem));
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      //photo: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, "El nombre no debe exceder los 20 caracteres")
        .required("Debe digitar su nombre completo"),
      email: Yup.string()
        .email("Por ingrese un correo válido")
        .required("Debe digitar su correo electrónico"),
      password: Yup.string()
        .required("Debe digitar una contraseña")
        .matches(
          passwordRegex,
          "La contraseña al menos debe tener un dígito, una minúscula, una mayúscula y al menos un caracter no alfanumérico, debe contener más de 8 caracteres pero no exceder los 16 caracteres."
        )
        .oneOf(
          [Yup.ref("repeatPassword")],
          "La contraseña ingresada no coincide"
        ),
      repeatPassword: Yup.string()
        .required("Debe digitar una contraseña")
        .matches(
          passwordRegex,
          "La contraseña al menos debe tener un dígito, una minúscula, una mayúscula y al menos un caracter no alfanumérico, debe contener más de 8 caracteres pero no exceder los 16 caracteres."
        )
        .oneOf([Yup.ref("password")], "La contraseña ingresada no coincide"),
    }),
    onSubmit: async (values) => {
      const avatar = await fileUpload(file);
      values.photo = avatar;
      dispatch(actionRegisterWithEmailAndPassword(values));
    },
  });
  if(isLoading) return (
    <cargando/>
  );
  
  if(error) {
    Swal.fire({
      title: "Oops!",
      text: "Ha ocurrido un error en la creación de la cuenta",
      icon: "error",
    });
  }
  if(isAuth){
    Swal.fire({
      title: "Excelente!",
      text: "Has creado con éxito una cuenta",
      icon: "success",
    }).then((result) => {
      if(result.isconfirmed){
       navigate('/');
      }
    })
  }
  return (
    <main className="register">
      <figure className="register__image">
        <img src={image} alt="avatar" />
      </figure>
      <label htmlFor="photo">
        <img src={imagePhoto} alt="photo" />
        <input
          type="file"
          name=""
          id="photo"
          onChange={handleChangeFile}
          // {...formik.getFieldProps("photo")}
        />
      </label>

      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">
          <img src={imageUser} alt="name" />
          <input
            className={formik.touched.name && formik.errors.name ? "error" : ""}
            type="text"
            placeholder="Nombre completo"
            id="name"

            {...formik.getFieldProps("name")}
          />
        </label>

        {formik.touched.name && formik.errors.name ? (
          <div className="errorText">{formik.errors.name}</div>
        ) : null}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            <img src={imageEmail} alt="email" />
          </label>
          <input
            className={
              formik.touched.email && formik.errors.email ? "error" : " "
            }
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label
            htmlFor="Password"
            className="form-label"
            img
            src={imagePassword}
            alt="password"
          >
            Password
          </label>
          <input
            className={
              formik.touched.password && formik.errors.password ? "error" : " "
            }
            type="password"
            class="form-control"
            id="Password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="repeatPassword" className="form-label">
            repeatPassword
          </label>
          <input
            className={
              formik.touched.repeatPassword && formik.errors.repeatPassword
                ? "error"
                : " "
            }
            type="repeatPassword"
            class="form-control"
            id="repeatPassword"
            {...formik.getFieldProps("repeatPassword")}
          />
          {formik.touched.repeatPassword && formik.errors.repeatPassword ? (
            <div>{formik.errors.repeatPassword}</div>
          ) : null}
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </main>
  );
};

export default Register;
