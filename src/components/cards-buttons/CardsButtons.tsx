import { FC, memo, useContext, useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import { observer } from "mobx-react-lite";
import styles from "./CardsButtons.module.scss";
import { Context } from "../..";
import Modal from "../modal/Modal";
import IPopup from "../../models/IPupup";

interface ICardsButtons {
  className?: string;
  setSliderIsOpen: (bool: boolean) => void;
  setAllCards: (bool: boolean) => void;
}

const CardsButtons: FC<ICardsButtons> = ({
  setSliderIsOpen,
  setAllCards,
}: ICardsButtons) => {
  const { store } = useContext(Context);
  const userId = store.user.id;
  const completedCard = store.cards.filter((card) => !card.isCompleted);

  const [popup, setPopUp] = useState<IPopup>({
    text: "",
    buttonText: "",
    function: "",
    userId: "",
  });

  //   if (!store.isActivated) {
  //     return <></>;
  //   }

  return (
    <div className={styles.buttons}>
      <ButtonGroup
        variant="contained"
        sx={{ marginRight: "auto" }}
        className={styles.buttonsRepeat}
      >
        <Button
          onClick={() => {
            window.scrollTo(0, document.body.scrollHeight);
            store.setCreateCard(true);
          }}
          variant="contained"
          disabled={!store.cards.length}
        >
          Создать карточку
        </Button>
        <Button
          onClick={() => {
            setSliderIsOpen(true);
            setAllCards(true);
          }}
          variant="contained"
          disabled={!store.cards.length}
        >
          Повторить все
        </Button>
        <Button
          onClick={() => {
            setSliderIsOpen(true);
            setAllCards(false);
          }}
          variant="contained"
          disabled={!completedCard.length}
        >
          Повторить невыполненные
        </Button>
      </ButtonGroup>

      <Button
        onClick={() => {
          setPopUp({
            buttonText: "Удалить выполненные",
            function: "deleteCompleted",
            text: "Вы действительно хотите удалить выполненные карточки?",
            userId: userId,
          });
          store.setOpenModal(true);
        }}
        disabled={!store.cards.find((card) => card.isCompleted)}
      >
        Удалить выполненные
      </Button>
      <Button
        color="error"
        onClick={() => {
          setPopUp({
            buttonText: "Удалить все",
            function: "deleteAll",
            text: "Вы действительно хотите удалить все карточки?",
            userId: userId,
          });
          store.setOpenModal(true);
        }}
        disabled={!store.cards.length}
      >
        Удалить все карточки
      </Button>
      <Modal popup={popup} />
    </div>
  );
};
export default observer(CardsButtons);
