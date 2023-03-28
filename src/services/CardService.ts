import api from "../http";
import ICard from "../models/ICard";

class CardService {
  static async createCard(card: ICard) {
    const newCard = await api.post("/create-card", { ...card });
    return newCard;
  }

  static async getCards() {
    const cards = await api.get("/cards");
    return cards;
  }

  static async deleteCard(id: string) {
    const card = await api.delete(`/delete-card/${id}`);
    return card;
  }

  static async completeCard(id: string) {
    const card = await api.patch(`./complete-card/${id}`);
    return card;
  }

  static async deleteCompleted(userId: string) {
    await api.delete(`/delete-completed/${userId}`);
  }

  static async deleteAllCards(userId: string) {
    await api.delete(`/delete-cards/${userId}`);
  }

  static async deleteImg(img: string) {
    await api.post("/delete-img", { img });
  }
}

export default CardService;
