import { makeAutoObservable } from "mobx";
import canvasState from "../store/canvasState";

export default class Tool {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }

  destroyEvent() {
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

  stroll() {
    window.scrollTo({ top: 0 });
  }

  set fillColor(color) {
    this.ctx.fillStyle = color;
  }

  set strokeColor(color) {
    this.ctx.strokeStyle = color;
  }

  set lineWidth(width) {
    this.ctx.lineWidth = width;
  }
}
