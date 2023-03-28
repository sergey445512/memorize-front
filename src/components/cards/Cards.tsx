import { FC, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Skeleton } from "@mui/material";
import cn from "classnames";
import styles from "./Cards.module.scss";
import { Context } from "../..";
import CardData from "../сard/Card";
import CreateCard from "../сreateCard/CreateCard";

const Cards: FC = () => {
  const { store } = useContext(Context);
  useEffect(() => {
    store.getCards();
  }, [store]);

  return (
    <div className={cn(styles.cards)}>
      {store.showSkeleton ? (
        <>
          <Skeleton variant="rectangular" className={styles.skeleton} />
          <Skeleton variant="rectangular" className={styles.skeleton} />
          <Skeleton variant="rectangular" className={styles.skeleton} />
        </>
      ) : (
        store.cards.map((card) => <CardData {...card} key={card._id} />)
      )}

      <CreateCard />
    </div>
  );
};

export default observer(Cards);
