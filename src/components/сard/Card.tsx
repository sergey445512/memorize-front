import { FC, useContext, useEffect, useState } from "react";
import {
  ButtonGroup,
  Typography,
  Button,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { observer } from "mobx-react-lite";
import cn from "classnames";
import { Context } from "../..";
import styles from "./Card.module.scss";
import ICard from "../../models/ICard";

const CardData: FC<ICard> = ({
  word,
  context,
  description,
  _id,
  isCompleted,
  className,
  image,
  type,
}: ICard) => {
  const { store } = useContext(Context);
  const [answer, setAnswer] = useState("");
  const [rotate, setRotate] = useState(false);
  const [completedFront, setCompletedFront] = useState(isCompleted);
  const [inputDisabled, setInputDisabled] = useState(false);
  useEffect(() => {});

  const homeCard = {
    word: "Memory",
    description:
      "The ability to remember information, experiences, and people.",
    context:
      "I have a good memory and am able to retain facts easily. That last conversation we had is engraved on my memory forever.",
    img: "http://localhost:5000/uploads/homeImg.jpg",
  };

  useEffect(() => {
    if (answer === word) {
      setTimeout(() => {
        setRotate(true);
      }, 400);

      setInputDisabled(true);
    }
    if (answer === word && !isCompleted) {
      setCompletedFront(true);
      store.completeCard(_id as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer]);

  return (
    <div
      className={cn(styles.card, className, {
        [styles.completedCard]: isCompleted,
        [styles.rotate]: rotate,
        [styles.slaider]: type === "slider",
        [styles.homeCard]: type === "home",
      })}
    >
      <div
        className={styles.front}
        onClick={() => {
          setRotate(!rotate);
        }}
      >
        {(type === "home" || image) && (
          <CardMedia
            component="img"
            sx={{ height: "140px", width: "100%" }}
            title="cardImg"
            src={
              type === "home" ? homeCard.img : `http://localhost:5000/${image}`
            }
            alt="fjfj"
          />
        )}

        <TaskAltIcon
          className={cn(styles.completedIconDis, {
            [styles.completedIcon]: completedFront,
          })}
        />
      </div>
      {type === "slider" && (
        <input
          className={cn(styles.answerInput, className, {
            [styles.rotateAnswer]: rotate,
          })}
          placeholder="Введите слово"
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
          disabled={inputDisabled}
        />
      )}

      <div className={styles.back}>
        <CardContent
          onClick={() => {
            setRotate(!rotate);
          }}
        >
          <Typography
            gutterBottom
            variant="h4"
            component="h4"
            className={styles.word}
          >
            {type === "home" ? homeCard.word : word}
          </Typography>
          {(description || type === "home") && (
            <Typography
              gutterBottom
              variant="body1"
              component="div"
              style={{ color: "#1976D2" }}
            >
              Описание:
            </Typography>
          )}

          <Typography
            gutterBottom
            variant="body1"
            component="div"
            style={{ marginLeft: "5px" }}
          >
            {type === "home" ? homeCard.description : description}
            {/* {"fjfjfj" || } */}
          </Typography>
          {(type === "home" || context) && (
            <Typography
              gutterBottom
              variant="body1"
              component="div"
              style={{ color: "#1976D2" }}
            >
              Контекст:
            </Typography>
          )}

          <Typography
            gutterBottom
            variant="body1"
            component="div"
            style={{ marginLeft: "5px" }}
          >
            {type === "home" ? homeCard.context : context}
          </Typography>
        </CardContent>
        <CardActions>
          <ButtonGroup
            variant="text"
            sx={{ width: "100%", position: "relative", bottom: "0px" }}
          >
            {type !== "slider" && (
              <Button
                onClick={() => {
                  if (type === "home") return;
                  store.deleteCard(_id as string);
                }}
                sx={{ width: "100%" }}
              >
                Удалить
              </Button>
            )}

            <Button
              sx={{ width: "100%" }}
              onClick={() => {
                if (type === "home") return;
                store.completeCard(_id as string);
                setCompletedFront(!completedFront);
              }}
            >
              {!completedFront ? "Уже знаю" : "Не знаю"}
            </Button>
          </ButtonGroup>
          <TaskAltIcon
            className={cn(styles.completedIconDis, {
              [styles.completedIcon]: completedFront,
            })}
          />
        </CardActions>
      </div>
    </div>
  );
};

export default observer(CardData);
