import {
  Button,
  ButtonGroup,
  TextField,
  CardMedia,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import {
  FC,
  useContext,
  useEffect,
  useState,
  useRef,
  MutableRefObject,
  ChangeEvent,
} from "react";
import { useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import styles from "./CreateCard.module.scss";
import api from "../../http";
import ICard from "../../models/ICard";

const CreateCard: FC = () => {
  const [imgUrl, setImgUrl] = useState("");
  const { store } = useContext(Context);
  const inputRef = useRef(null) as MutableRefObject<HTMLInputElement | null>;
  const [imgText, setImgText] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICard>({
    defaultValues: {
      word: "",
      context: "",
      description: "",
      image: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    store.setLoading(true);
    const file = store.file;
    const formData = new FormData();
    formData.append("image", file);

    const fn = async () => {
      try {
        const data = await api.post("/upload", formData);
        setImgUrl(data.data.path);
        setImgText(false);
      } catch (e) {
        console.log(e);
      } finally {
        store.setLoading(false);
      }
    };
    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.file]);

  const inputHandle = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const target = e.target;
      store.setLoading(true);
      const formData = new FormData();
      if (target.files) {
        const file = target.files[0];
        formData.append("image", file);
        console.log(formData);
        const data = await api.post("/upload", formData);
        setImgUrl(data.data.path);
        setImgText(false);
      }
    } catch (e) {
      console.log(e);
    } finally {
      store.setLoading(false);
    }
  };

  const createCard = async (newCard: ICard) => {
    try {
      store.setLoading(true);
      if (!store.file && !imgUrl) {
        setImgText(true);
        return;
      }

      await store.createCard({ ...newCard, image: imgUrl });
      setImgUrl("");
      reset();
      store.setFile("");
      store.setCreateCard(false);
      setImgText(false);
    } catch (e) {
      console.log(e);
    } finally {
      store.setLoading(false);
    }
  };

  if (!store.isCreateCard) {
    return (
      <Button
        variant="outlined"
        onClick={() => store.setCreateCard(!store.isCreateCard)}
        className={styles.create}
        sx={{ borderRadius: "15px" }}
      >
        <AddIcon sx={{ fontSize: "70px" }} />
      </Button>
    );
  }

  return (
    <>
      <form className={styles.createCard} onSubmit={handleSubmit(createCard)}>
        {imgUrl && (
          <div className={styles.imageWrapper}>
            <CardMedia
              component="img"
              sx={{ height: 160 }}
              title="card img"
              src={`http://localhost:5000/${imgUrl}`}
            />

            <ClearIcon
              className={styles.deleteImgIcon}
              sx={{ fontSize: "30px" }}
              onClick={() => {
                store.deleteImg(imgUrl);
                store.setFile("");
                setImgUrl("");
              }}
            />
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <TextField
            type="text"
            variant="standard"
            label="Слово"
            {...register("word", {
              required: "Поле обязательно для заполнения!",
            })}
            helperText={errors.word?.message}
            error={Boolean(errors.word?.message)}
            multiline={true}
          />
          <TextField
            type="text"
            variant="standard"
            label="Описание"
            {...register("description")}
            multiline={true}
          />

          <TextField
            type="text"
            variant="standard"
            label="Контекст"
            {...register("context")}
            multiline={true}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {imgText && (
            <Typography
              variant="body1"
              component="p"
              color="error"
              textAlign="center"
            >
              Добавьте картинку!
            </Typography>
          )}
          {!imgUrl && (
            <Button
              variant="contained"
              onClick={() => inputRef.current?.click()}
            >
              Добавить изображение
            </Button>
          )}

          {!imgUrl && (
            <Button
              variant="contained"
              onClick={() => store.setPaintIsOpen(true)}
            >
              Нарисовать
            </Button>
          )}

          <input
            type="file"
            hidden
            ref={inputRef}
            onChange={(e) => {
              inputHandle(e);
            }}
            accept="image/*"
          />
          <Button type="submit" variant="outlined">
            Создать карточку
          </Button>

          <ButtonGroup
            variant="text"
            aria-label="outlined primary button group"
            sx={{ width: "100%" }}
          >
            <Button
              sx={{ width: "50%" }}
              onClick={() => {
                reset();
                store.clearCard(imgUrl);
                setImgUrl("");
                store.setFile("");
              }}
            >
              Очистить
            </Button>
            <Button
              sx={{ width: "50%" }}
              onClick={() => {
                store.setCreateCard(false);
                store.clearCard(imgUrl);
                setImgUrl("");
                reset();
                store.setFile("");
              }}
            >
              Отменить
            </Button>
          </ButtonGroup>
        </div>
      </form>
    </>
  );
};

export default observer(CreateCard);
