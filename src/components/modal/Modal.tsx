import { useContext, FC } from "react";
import { observer } from "mobx-react-lite";
import {
  DialogActions,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { Context } from "../..";
import IPopup from "../../models/IPupup";

interface IModalProps {
  popup: IPopup;
}

const Modal: FC<IModalProps> = ({ popup }: IModalProps) => {
  const { store } = useContext(Context);

  return (
    <div>
      <Dialog
        open={store.openModal}
        onClose={() => store.setOpenModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {popup.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => store.setOpenModal(false)}>Отменить</Button>
          <Button
            onClick={() => {
              if (popup.function === "deleteAll") {
                store.deleteAllCards(popup.userId);
                store.setOpenModal(false);
              }
              if (popup.function === "deleteCompleted") {
                store.deleteCompleted(popup.userId);
                store.setOpenModal(false);
              }
            }}
            autoFocus
          >
            {popup.buttonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default observer(Modal);
