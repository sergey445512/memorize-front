import { CircularProgress } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";
import { Context } from ".";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Registration from "./pages/Registration";
import Start from "./pages/Start";
import canvasState from "./store/canvasState";
import styles from "./App.module.scss";
import About from "./pages/About";
import Draw from "./pages/Draw";

function App() {
  const { store } = useContext(Context);
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    canvasState.setDevice("mobile");
  } else {
    canvasState.setDevice("desktop");
  }

  useEffect(() => {
    store.checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (store.isStarting) {
    return (
      <div className={styles.starting}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App">
      {store.isLoading && (
        <div className={styles.loader}>
          <CircularProgress style={{ display: "flex" }} />
        </div>
      )}
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/training" element={<Start />} />
          <Route path="/paint" element={<Draw />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </div>
  );
}

export default observer(App);
