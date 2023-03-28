import axios from "axios";
import { makeAutoObservable } from "mobx";
import { API_URL } from "../http";
import { IAuthData } from "../models/IAuthData";
import ICard from "../models/ICard";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import CardService from "../services/CardService";

export default class Store {
  user = {} as IUser;
  isAuth = false;
  authError: string = "";
  isLoading: boolean = false;
  isStarting: boolean = true;
  cards = [] as ICard[];
  completedCards = [] as ICard[];
  sliderIsOpne = false;
  paintIsOpen = false;
  showSkeleton = true;
  dataImgUrl = "";
  file: any;
  isActivated: boolean = false;
  isFirstStarting: boolean = true;
  isCreateCard: boolean = false;
  openModal: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  setShowSkeleton(bool: boolean) {
    this.showSkeleton = bool;
  }

  setStarting(bool: boolean) {
    this.isStarting = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setAuthError(message: string) {
    this.authError = message;
  }

  setCards(cards: ICard[]) {
    this.cards = cards;
  }

  setCompletedCards(completedCards: ICard[]) {
    this.completedCards = completedCards;
  }

  setPaintIsOpen(bool: boolean) {
    this.paintIsOpen = bool;
    this.getCards();
  }

  setDataImgUrl(url: string) {
    this.dataImgUrl = url;
  }

  setFile(file: any) {
    this.file = file;
  }

  setIsActivated(isActivate: boolean) {
    this.isActivated = isActivate;
  }

  setIsFirstStarting(bool: boolean) {
    this.isFirstStarting = bool;
  }

  setCreateCard(bool: boolean) {
    this.isCreateCard = bool;
  }

  setOpenModal(bool: boolean) {
    this.openModal = bool;
  }

  async login(email: string, password: string) {
    try {
      this.setLoading(true);
      const result = await AuthService.login(email, password);
      localStorage.setItem("token", result.data.accessToken);

      this.setAuth(true);
      this.setUser(result.data.userDto);
    } catch (e: any) {
      console.log(e);
      this.setAuthError(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async registration(email: string, password: string) {
    try {
      this.setLoading(true);
      const result = await AuthService.registration(email, password);
      localStorage.setItem("token", result.data.accessToken);
      this.setAuth(true);
      this.setUser(result.data.userDto);
      return this.user.email;
    } catch (e: any) {
      console.log(e);
      this.setAuthError(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async logout() {
    try {
      this.setLoading(true);
      const result = await AuthService.logout();
      console.log(result);
      this.setAuth(false);
      this.setUser({} as IUser);
      localStorage.removeItem("token");
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }

  async checkAuth() {
    try {
      this.setStarting(true);
      const response = await axios.get<IAuthData>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      this.setIsActivated(response.data.userDto.isActivated);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.userDto);
    } catch (e) {
      console.log(e);
    } finally {
      this.setStarting(false);
    }
  }

  async getCards() {
    try {
      const cards = await CardService.getCards();

      this.setCards(cards.data);
    } catch (e) {
    } finally {
      this.setShowSkeleton(false);
    }
  }

  async createCard(card: ICard) {
    try {
      this.setLoading(true);
      await CardService.createCard(card);

      this.getCards();
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }

  async deleteCard(id: string) {
    try {
      await CardService.deleteCard(id);

      this.getCards();
    } catch (e) {
      console.log(e);
    } finally {
    }
  }

  async completeCard(id: string) {
    try {
      await CardService.completeCard(id);

      this.getCards();
    } catch (e) {
      console.log(e);
    } finally {
    }
  }

  async deleteCompleted(userId: string) {
    try {
      this.setLoading(true);
      await CardService.deleteCompleted(userId);
      this.getCards();
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }

  async deleteAllCards(userId: string) {
    try {
      this.setLoading(true);
      await CardService.deleteAllCards(userId);
      this.getCards();
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }

  async deleteImg(img: string) {
    try {
      await CardService.deleteImg(img);
    } catch (e) {
      console.log(e);
    } finally {
    }
  }

  async clearCard(img: string) {
    try {
      this.deleteImg(img);
    } catch (e) {
      console.log(e);
    } finally {
      //   this.setLoading(false);
    }

    this.deleteImg(img);
  }
}
