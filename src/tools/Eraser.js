import Tool from "./Tool";
import canvasState from "../store/canvasState";
import Brush from "./Brush";

export default class Eraser extends Brush {
  color = this.color;
  constructor(canvas) {
    super(canvas);
    this.listen();
  }

  draw(x, y) {
    this.ctx.lineTo(x, y);
    this.ctx.lineCap = "round";
    this.ctx.strokeStyle = "#fff";
    this.ctx.stroke();
  }
}
