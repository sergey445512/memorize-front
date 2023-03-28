import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import cn from "classnames";
import CardsButtons from "../components/cards-buttons/CardsButtons";
import { Context } from "..";
import Cards from "../components/cards/Cards";
import styles from "../pages-styles/Start.module.scss";
import Slider from "../components/slider/Slider";
import Paint from "../components/paint/Paint";
import { Typography } from "@mui/material";

const Start = () => {
  const { store } = useContext(Context);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  store.setShowSkeleton(true);
  if (store.paintIsOpen) {
    document.body.classList.add("hidden");
    document.body.style.overflow = "hidden";
    window.scrollTo({
      top: 0,
    });
  } else {
    document.body.style.overflow = "";
    window.scrollTo(0, document.body.scrollHeight);
  }

  const [sliderIsOpen, setSliderIsOpen] = useState(false);
  const [allCards, setAllCards] = useState(false);

  if (!store.isAuth) {
    return (
      <Typography component="h4" variant="h4" className={styles.authMessage}>
        Необходимо авторизоваться.
      </Typography>
    );
  }

  //   if (!store.user.isActivated) {
  //     return (
  //       <Typography component="h4" variant="h4" className={styles.authMessage}>
  //         {` Активируйте почту ${store.user.email}.`}
  //       </Typography>
  //     );
  //   }

  return (
    <div className={styles.cardsPage}>
      {sliderIsOpen ? (
        <Slider
          className={cn(styles.slider, {
            [styles.sliderIsOpen]: sliderIsOpen,
          })}
          allCards={allCards}
          setSliderIsOpen={setSliderIsOpen}
        />
      ) : (
        <>
          <CardsButtons
            setSliderIsOpen={setSliderIsOpen}
            setAllCards={setAllCards}
          />
          <div className={styles.cards}>
            <Cards />
          </div>
        </>
      )}
      {store.paintIsOpen && <Paint />}
    </div>
  );
};

export default observer(Start);
