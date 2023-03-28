import { TextField, Button, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { FC, ReactNode, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../..";
import styles from "./Form.module.scss";
import { Link, Navigate } from "react-router-dom";

interface IArg {
  email: string;
  password: string;
}

interface IFormProps {
  title: ReactNode;
  buttonText: ReactNode;
  type: "registration" | "login";
}

const Form: FC<IFormProps> = ({ title, buttonText, type }: IFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });
  const { store } = useContext(Context);
  //   const [activateMessage, setActivateMessage] = useState<boolean>(false);
  //   const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    store.setAuthError("");
  }, [store]);

  if (store.isAuth) {
    return <Navigate to="/" />;
  }

  const submit = async ({ email, password }: IArg) => {
    if (type === "login") {
      await store.login(email, password);

      if (!store.authError) {
        // setActivateMessage(true);
        store.setAuthError("");
      }
    }

    if (type === "registration") {
      const userEmail: unknown = await store.registration(email, password);
      //   if (typeof userEmail === "string") {
      //     setUserEmail(userEmail);
      //   }

      if (!store.authError) {
        // setActivateMessage(true);
        store.setAuthError("");
      }
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(submit)}>
      <Typography variant="h4" component={"h4"}>
        {title}
      </Typography>
      <TextField
        label="Почта"
        {...register("email", { required: `Укажите email` })}
        helperText={errors.email?.message}
        error={Boolean(errors.email?.message || store.authError)}
      />
      <TextField
        label="Пароль"
        {...register("password", {
          required: "Укажите пароль",
          maxLength: 32,
          minLength: {
            value: 5,
            message: "Минимум 5 символов",
          },
        })}
        helperText={errors.password?.message || store.authError}
        error={Boolean(errors.password?.message || store.authError)}
        type="password"
      />
      <Button variant="contained" sx={{ padding: "10px" }} type="submit">
        {buttonText}
      </Button>
      {/* {activateMessage && type === "registration" && (
        <p>
          {`На почту ${userEmail} было отправлено сообщение для подтверждения
          аккаунта`}
        </p>
      )} */}

      <div className={styles.links}>
        {type === "registration" && (
          <Link to="/login">Уже зарегистрированы?</Link>
        )}
        {type === "login" && (
          <Link to="/registration">Не зарегистрированы?</Link>
        )}
        <Link to="/">На главную</Link>
      </div>
    </form>
  );
};

export default observer(Form);
