import { Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import styles from "../pages-styles/Home.module.scss";
import { Typography } from "@mui/material";
import Card from "../components/сard/Card";
import { useContext, useEffect } from "react";
import { Context } from "..";

const Home = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    setTimeout(() => {
      store.setIsFirstStarting(false);
    }, 5000);
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.titleWrapper}>
        {store.isFirstStarting && <div className={styles.titleDiv}></div>}

        <Typography component="h1" variant="h2" className={styles.homeTitle}>
          Создавайте карточки для легкого изучения иностранных слов!
        </Typography>
      </div>

      <div className={styles.list}>
        <ul className={styles.listContainer}>
          {store.isFirstStarting && <div className={styles.div}></div>}
          <li>— Добавляйте или нарисуйте картинки</li>
          <li>— Добавляйте описание слов</li>
          <li>— Добавляйте контекст</li>
          <li>— Повторяйте слова</li>
        </ul>

        <div className={styles.cardContainer}>
          {store.isFirstStarting && <div className={styles.cardDiv}></div>}

          <Card className={styles.card} type="home" />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        {store.isFirstStarting && <div className={styles.buttonDiv}></div>}

        <Button variant="contained" size="large">
          <Link to="/training">Начать!</Link>
        </Button>
      </div>
    </div>
  );
};

export default observer(Home);
