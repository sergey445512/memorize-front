import { FC, useState, useContext } from "react";
import { Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import cn from "classnames";
import { Context } from "../..";
import styles from "./Header.module.scss";

interface IHeader {
  className: string;
}

const Header: FC<IHeader> = ({ className }: IHeader) => {
  const { store } = useContext(Context);
  const [popUpIsOpen, setPopUpIsOpen] = useState(false);

  if (popUpIsOpen) {
    document.body.style.overflow = "hidden";
  }

  if (!popUpIsOpen) {
    document.body.style.overflow = "";
  }
  return (
    <header className={cn(styles.header, className)}>
      <div className={cn(styles.headerContainer)}>
        <nav className={cn(styles.nav)}>
          <Link to="/">
            <p>memorize</p>
          </Link>
          <MenuIcon
            className={styles.menuBurger}
            onClick={() => {
              setPopUpIsOpen(true);
            }}
          />
          <div
            className={cn(styles.navigation, {
              [styles.navigationIsOpen]: popUpIsOpen,
            })}
          >
            <Button
              onClick={() => {
                setPopUpIsOpen(false);
              }}
            >
              Закрыть
            </Button>

            <NavLink
              to="/training"
              onClick={() => {
                setPopUpIsOpen(false);
              }}
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? styles.active : ""
              }
            >
              Начать
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => {
                setPopUpIsOpen(false);
              }}
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? styles.active : ""
              }
            >
              О нас
            </NavLink>
            <div className={styles.buttons}>
              {!store.isAuth ? (
                <>
                  <Button variant="contained" className={styles.registration}>
                    <Link
                      to="/registration"
                      onClick={() => {
                        setPopUpIsOpen(false);
                      }}
                    >
                      Регистрация
                    </Link>
                  </Button>
                  <Button variant="contained">
                    <Link
                      to="/login"
                      onClick={() => {
                        setPopUpIsOpen(false);
                      }}
                    >
                      Войти
                    </Link>
                  </Button>
                </>
              ) : (
                <Button
                  variant="outlined"
                  onClick={() => {
                    store.logout();
                    setPopUpIsOpen(false);
                  }}
                >
                  Выйти
                </Button>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default observer(Header);
