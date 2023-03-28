import Tool from "./Tool";
import canvasState from "../store/canvasState";

export default class Brush extends Tool {
  constructor(canvas) {
    super(canvas);
    this.listen();
  }

  listen() {
    if (canvasState.device === "mobile") {
      this.canvas.ontouchmove = this.mouseMoveHandler.bind(this);
      this.canvas.ontouchstart = this.mouseDownHandler.bind(this);
      this.canvas.ontouchend = this.stopPainting.bind(this);
      this.canvas.ontouchcancel = this.stopPainting.bind(this);
    } else {
      this.canvas.onpointermove = this.mouseMoveHandler.bind(this);
      this.canvas.onpointerdown = this.mouseDownHandler.bind(this);
      this.canvas.onpointerup = this.stopPainting.bind(this);
      this.canvas.onpointerleave = this.stopPainting.bind(this);
    }
  }

  stopPainting() {
    this.mouseDown = false;
  }

  mouseDownHandler(e) {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.startX = e.offsetX;

    if (canvasState.device === "mobile") {
      const rect = e.target.getBoundingClientRect();
      const x = e.targetTouches[0].pageX - rect.left;
      const y = e.targetTouches[0].pageY - rect.top;
      this.ctx.moveTo(x, y);
    } else {
      this.ctx.moveTo((this.startX = e.offsetX), (this.startY = e.offsetY));
    }
  }

  mouseMoveHandler(e) {
    e.preventDefault();
    if (this.mouseDown) {
      if (canvasState.device === "mobile") {
        const rect = e.target.getBoundingClientRect();
        const x = e.targetTouches[0].pageX - rect.left;
        const y = e.targetTouches[0].pageY - rect.top;
        this.draw(x, y);
      } else {
        this.draw(e.offsetX, e.offsetY);
      }
    }
  }

  draw(x, y) {
    this.ctx.lineTo(x, y);
    this.ctx.lineCap = "round";
    this.ctx.strokeStyle = this.color;
    this.ctx.stroke();
  }
}
