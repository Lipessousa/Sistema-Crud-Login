import '../Styles/Cadastro.css'
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import user from '../assets/user.png';
import cadeado from '../assets/cadeado.png';
import logo from '../assets/logo_meta.png';
import cadeadoAberto from '../assets/cadeadoAberto.png'
import { Link } from 'react-router-dom';


function Cadastro({logado=false}) {

  const handleRegister = (values) => {
    Axios.post("http://localhost:3001/register", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      alert(response.data.msg);
      console.log(response);
    });
  };

  const validationsRegister = yup.object().shape({
    email: yup
      .string()
      .email("E-mail inválido")
      .required("O e-mail é obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .required("A senha é obrigatória"),
    confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "As senhas são diferentes")
      .required("A confirmação da senha é obrigatória"),
  });


  return (
    <div className="container-login">

      <div className="left-login">
        <h1>Bem-vindo a<br></br>Meta Dev's </h1>
        <img className="logo" src={logo}></img>
      </div>

      <div className="right-login">
        <div className="card-login">

        <div className="user-links">
          <div className="user-link-home">
            {!logado && <Link to="/">Home</Link>}
          </div>

          <div className="user-link-cad">
            {!logado && <Link to="/cadastro">Cadastro</Link>}
          </div>
        </div>

          <Formik
            initialValues={{}}
            onSubmit={handleRegister}
            validationSchema={validationsRegister}
          >
            <Form className="register-form">
              <div className="form-group">
                <div className="item-text">
                  <img className="icon" src={user}></img>
                  <label form="email">E-mail</label>
                </div>

                <Field name="email" className="form-field" placeholder='admin@gmail.com' />

                <ErrorMessage
                  component="span"
                  name="email"
                  className="form-error"
                />
              </div>

              {/*Outro campo*/}

              <div className="form-group">
                <div className="item-text">
                  <img className="icon" src={cadeado}></img>
                  <label form="email">Crie sua senha</label>
                </div>
                <Field name="password" type='password' className="form-field" placeholder='Mínimo 8 caracteres' />

                <ErrorMessage
                  component="span"
                  name="password"
                  className="form-error"
                />
              </div>

              {/*Confirmação*/}

              <div className="form-group">
                <div className="item-text">
                  <img className="icon" src={cadeadoAberto}></img>
                  <label form="email">Confirme sua senha</label>
                </div>
                <Field name="confirmation" type='password' className="form-field" />

                <ErrorMessage
                  component="span"
                  name="confirmation"
                  className="form-error"
                />
              </div>
              <button className="button" type="submit">
                Cadastrar
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
