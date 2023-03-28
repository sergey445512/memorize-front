import React, { FC } from "react";
import Form from "../components/form/Form";

const Registration: FC = () => {
  return (
    <div style={{ padding: "7px" }}>
      <Form
        buttonText="Зарегистриваться"
        title="Регистрация"
        type="registration"
      />
    </div>
  );
};

export default Registration;
