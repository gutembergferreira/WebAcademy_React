import { useEffect, useState } from "react";
import { Form, Image, Button } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { doLogin } from "../../redux/slices/api.slice.login";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { error, loading, isSucess } = useSelector(
    (state: RootState) => state.apiLogin
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");

  async function TryLogin() {
    dispatch(
      doLogin({
        email: email,
        senha: password,
      })
    );
  }

  useEffect(() => {
    if (isSucess) {
      navigate("/home");
    }
  }, [isSucess]);

  return (
    <Form style={{ width: "300px" }} className="container">
      <div style={{ margin: "0 auto" }}>
        <Image className="imageBorder" src={logo} />
      </div>
      <input
        placeholder="Digite aqui seu email"
        onChange={(e) => {
          SetEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Digite aqui sua senha"
        onChange={(e) => {
          SetPassword(e.target.value);
        }}
      />

      {loading ? (
        "Loading..."
      ) : (
        <Button onClick={() => TryLogin()}>Login</Button>
      )}
      {error}
    </Form>
  );
}
