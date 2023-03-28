import Tool from "./Tool";
import canvasState from "../store/canvasState";

export default class Rect extends Tool {
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
    const rect = e.target.getBoundingClientRect();
    if (canvasState.device === "mobile") {
      this.startX = e.targetTouches[0].pageX - rect.left;
      this.startY = e.targetTouches[0].pageY - rect.top;
    } else {
      this.startX = e.pageX - rect.left;
      this.startY = e.pageY - rect.top;
    }
    this.saved = this.canvas.toDataURL();
  }

  mouseMoveHandler(e) {
    e.preventDefault();
    if (this.mouseDown) {
      const rect = e.target.getBoundingClientRect();
      if (canvasState.device === "mobile") {
        const currentX = e.targetTouches[0].pageX - rect.left;
        const currentY = e.targetTouches[0].pageY - rect.top;
        const width = currentX - this.startX;
        const height = currentY - this.startY;
        this.draw(this.startX, this.startY, width, height);
      } else {
        const currentX = e.pageX - rect.left;
        const currentY = e.pageY - rect.top;
        const width = currentX - this.startX;
        const height = currentY - this.startY;
        this.draw(this.startX, this.startY, width, height);
      }
    }
  }

  draw(x, y, w, h) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();

      this.ctx.rect(x, y, w, h);
      this.ctx.fill();
      this.ctx.stroke();
    };
  }
}
