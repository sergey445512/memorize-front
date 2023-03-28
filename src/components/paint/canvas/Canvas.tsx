import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useRef } from "react";
import toolState from "../../../store/toolState";
import Brush from "../../../tools/Brush";
import styles from "./Canvas.module.scss";
import canvasState from "../../../store/canvasState";

interface ICanvas {
  canvasSize: number;
}

const Canvas: FC<ICanvas> = ({ canvasSize }: ICanvas) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    toolState.setTool(new Brush(canvasRef.current));
  }, []);

  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef?.current?.toDataURL());
  };

  return (
    <div className={styles.canvas}>
      <canvas
        ref={canvasRef}
        onPointerDown={mouseDownHandler}
        height={canvasSize}
        width={canvasSize}
        style={{ width: `${canvasSize}px`, height: `${canvasSize}px` }}
      />
    </div>
  );
};

export default observer(Canvas);
