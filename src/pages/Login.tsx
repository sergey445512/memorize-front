import React, { FC } from "react";
import Form from "../components/form/Form";

const Login: FC = () => {
  return (
    <div style={{ padding: "7px" }}>
      <Form buttonText="Войти" title="Авторизация" type="login" />
    </div>
  );
};

export default Login;
