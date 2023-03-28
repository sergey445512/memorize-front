import Canvas from "./canvas/Canvas";
import Toolbar from "./toolbar/ToolBar";
import cn from "classnames";
import styles from "./Paint.module.scss";
import Container from "../container/Container";
import { useState } from "react";

const Paint = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window.screen.width);

  window.onresize = () => {
    setWindowWidth(window.screen.width);
  };

  let canvasSize = 700;

  if (windowWidth > 700) {
    canvasSize = 600;
  } else if (windowWidth > 600) {
    canvasSize = 570;
  } else if (windowWidth > 500) {
    canvasSize = 470;
  } else if (windowWidth > 380) {
    canvasSize = 370;
  } else {
    canvasSize = 299;
  }

  return (
    <div className={cn(styles.paint)}>
      <Container className={cn(styles.container)}>
        <Toolbar canvasSize={canvasSize} />
        <Canvas canvasSize={canvasSize} />
      </Container>
    </div>
  );
};

export default Paint;
