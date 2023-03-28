import { FC, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button } from "@mui/material";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import styles from "./Slider.module.scss";
import Card from "../сard/Card";
import { Context } from "../..";
import ICard from "../../models/ICard";

interface ISlider {
  className?: string;
  allCards: boolean;
  setSliderIsOpen: (bool: boolean) => void;
}

const Slider: FC<ISlider> = ({ allCards, setSliderIsOpen }: ISlider) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.screen.width);
  window.onresize = () => {
    setWindowWidth(window.screen.width);
  };

  const { store } = useContext(Context);

  useEffect(() => {
    store.setCompletedCards(store.cards.filter((card) => !card.isCompleted));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.cards.length]);

  const cards = allCards ? store.cards : store.completedCards;

  if (!store.cards.length) {
    setSliderIsOpen(false);
  }

  return (
    <div className={styles.sliderWrapper}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        spaceBetween={50}
        navigation={windowWidth > 500}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        style={{ padding: "40px 30px" }}
        effect="fade"
        className={styles.swiper}
        centeredSlides={true}
      >
        {cards.map((card) => (
          <SwiperSlide className={styles.slide}>
            <Card
              {...card}
              type="slider"
              key={card._id}
              className={styles.card}
            />
          </SwiperSlide>
        ))}
        <Button
          variant="text"
          className={styles.closeButton}
          color="error"
          onClick={() => setSliderIsOpen(false)}
          size="large"
        >
          Закрыть
        </Button>
      </Swiper>
    </div>
  );
};

export default observer(Slider);
