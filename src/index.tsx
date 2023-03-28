import { createContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.module.scss";
import App from "./App";
import Store from "./store/Store";

interface IStore {
  store: Store;
}

const store = new Store();

export const Context = createContext<IStore>({ store });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Context.Provider value={{ store }}>
      <App />
    </Context.Provider>
  </BrowserRouter>
);
