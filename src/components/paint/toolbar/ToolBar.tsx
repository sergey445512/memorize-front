import React, { FC, useContext, useRef, useState } from "react";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { RiArrowGoForwardFill } from "react-icons/ri";
import { RiArrowGoBackFill } from "react-icons/ri";
import { observer } from "mobx-react-lite";
import cn from "classnames";
import styles from "./ToolBar.module.scss";
import toolState from "../../../store/toolState";
import Brush from "../../../tools/Brush";
import canvasState from "../../../store/canvasState";
import Rect from "../../../tools/Rect";
import Circle from "../../../tools/Circle";
import Line from "../../../tools/Line";
import Eraser from "../../../tools/Eraser";
import { Button, Slider } from "@mui/material";
import eraserLink from "../icons/eraser.svg";
import circleLeink from "../icons/circle.svg";
import brushLink from "../icons/brush.svg";
import rectangleLink from "../icons/rectangle.svg";
import { Context } from "../../..";

interface IToolbar {
  canvasSize: number;
}

const Toolbar: FC<IToolbar> = ({ canvasSize }: IToolbar) => {
  const colorRef: any = useRef("black");
  const [value, setValue] = useState<number>(1);
  const [color, setColor] = useState("#000");
  const { store } = useContext(Context);

  const screenWidht = window.screen.width;
  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setValue(newValue);
      toolState.setLineWidth(newValue);
    }
  };

  let style;

  if (screenWidht > 850) {
    style = { height: `${canvasSize}px` };
  } else {
    style = { width: `${canvasSize}px` };
  }

  return (
    <>
      {screenWidht > 850 ? (
        <div className={styles.toolbar} style={style}>
          <ul>
            <p>Фигуры</p>
            <li onClick={() => toolState.setTool(new Rect(canvasState.canvas))}>
              <img
                src={rectangleLink}
                alt=""
                className={cn(styles.toolbar__btn, styles.rect)}
              />
              <span>Прямоугольник</span>
            </li>
            <li
              onClick={() => toolState.setTool(new Circle(canvasState.canvas))}
            >
              <img
                src={circleLeink}
                alt=""
                className={cn(styles.toolbar__btn, styles.circle)}
              />
              <span>Круг</span>
            </li>
            <li onClick={() => toolState.setTool(new Line(canvasState.canvas))}>
              <HorizontalRuleIcon
                className={cn(styles.toolbar__btn, styles.line)}
              />
              <span>Линия</span>
            </li>
          </ul>
          <ul>
            <p>Инструменты</p>
            <li
              onClick={() => {
                toolState.setTool(new Brush(canvasState.canvas));
                toolState.setStrokeColor(color);
              }}
            >
              <img
                src={brushLink}
                alt=""
                className={cn(styles.toolbar__btn, styles.brush)}
              />
              <span>Кисть</span>
            </li>
            <li
              onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}
            >
              <img
                src={eraserLink}
                alt=""
                className={cn(styles.toolbar__btn, styles.eraser)}
              />
              <span>Eraser</span>
            </li>
            <li></li>
          </ul>
          <ul className={styles.arrows}>
            <input
              defaultValue={color}
              type="color"
              ref={colorRef}
              onChange={(e) => {
                setColor(e.target.value);
                toolState.setStrokeColor(e.target.value);
                toolState.setFillColor(e.target.value);
              }}
              className={styles.colorInput}
            />
            <li>
              <RiArrowGoBackFill
                className={cn(styles.toolbar__btn, styles.back)}
                onClick={() => canvasState.undo()}
              />
            </li>
            <li>
              <RiArrowGoForwardFill
                className={cn(styles.toolbar__btn, styles.forward)}
                onClick={() => canvasState.redo()}
              />
            </li>
          </ul>

          <Slider
            getAriaLabel={() => "Temperature range"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={1}
            max={20}
            className={styles.slider}
          />

          <ul className={styles.buttons}>
            <Button
              onClick={() => {
                store.setFile(canvasState.saveImg());
                store.setPaintIsOpen(false);
              }}
            >
              Сохранить
            </Button>
            <Button
              onClick={() => {
                canvasState.clearCanvas();
              }}
            >
              Очистить
            </Button>
            <Button
              onClick={() => {
                store.setPaintIsOpen(false);
              }}
            >
              Закрыть
            </Button>
          </ul>
        </div>
      ) : (
        <div className={styles.toolbar} style={style}>
          <RiArrowGoBackFill
            className={cn(styles.toolbar__btn, styles.back)}
            onClick={() => canvasState.undo()}
          />

          <RiArrowGoForwardFill
            className={cn(styles.toolbar__btn, styles.forward)}
            onClick={() => canvasState.redo()}
          />

          <img
            src={rectangleLink}
            alt="rect"
            className={cn(styles.toolbar__btn, styles.rect)}
            onClick={() => toolState.setTool(new Rect(canvasState.canvas))}
          />

          <img
            src={circleLeink}
            alt="circ"
            className={cn(styles.toolbar__btn, styles.circle)}
            onClick={() => toolState.setTool(new Circle(canvasState.canvas))}
          />

          <img
            src={brushLink}
            alt=""
            className={cn(styles.toolbar__btn, styles.brush)}
            onClick={() => {
              toolState.setTool(new Brush(canvasState.canvas));
              toolState.setStrokeColor(color);
            }}
          />
          <HorizontalRuleIcon
            className={cn(styles.toolbar__btn, styles.line)}
            onClick={() => toolState.setTool(new Line(canvasState.canvas))}
          />
          <img
            src={eraserLink}
            alt=""
            className={cn(styles.toolbar__btn, styles.eraser)}
            onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}
          />

          <input
            defaultValue={color}
            type="color"
            ref={colorRef}
            onChange={(e) => {
              setColor(e.target.value);
              toolState.setStrokeColor(e.target.value);
              toolState.setFillColor(e.target.value);
            }}
            className={styles.colorInput}
          />
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={1}
            max={20}
            className={styles.slider}
          />

          <ul className={styles.buttons}>
            <Button
              onClick={() => {
                store.setFile(canvasState.saveImg());
                store.setPaintIsOpen(false);
              }}
            >
              Сохранить
            </Button>
            <Button
              onClick={() => {
                canvasState.clearCanvas();
              }}
            >
              Очистить
            </Button>
            <Button
              onClick={() => {
                store.setPaintIsOpen(false);
              }}
            >
              Закрыть
            </Button>
          </ul>
        </div>
      )}
    </>
  );
};

export default observer(Toolbar);
