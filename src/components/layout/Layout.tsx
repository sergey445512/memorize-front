import { FC } from "react";
import { Outlet } from "react-router-dom";
import Container from "../container/Container";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import styles from "./Layout.module.scss";

const Layout: FC = (): JSX.Element => {
  return (
    <div className={styles.layout}>
      <Header className={styles.header} />
      <Container>
        <main className={styles.main}>
          <Outlet />
        </main>
      </Container>

      <Footer className={styles.footer} />
    </div>
  );
};

export default Layout;
