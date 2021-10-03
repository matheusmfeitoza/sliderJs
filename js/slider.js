export default class Slider {
  constructor(slider, wrapper) {
    this.slider = document.querySelector(slider);
    this.wrapper = document.querySelector(wrapper);
    this.dist = { finalDistance: 0, startX: 0, movement: 0 };
  }

  onStart(event) {
    let typeEvent;
    if (event.type === "mousedown") {
      event.preventDefault();
      this.dist.startX = event.clientX;
      typeEvent = "mousemove";
    } else if (event.type === "touchstart") {
      this.dist.startX = event.changedTouches[0].clientX;
      typeEvent = "touchmove";
    }
    this.wrapper.addEventListener(typeEvent, this.onHoldClick);
  }
  moveSlide(positionX) {
    this.movePosition = positionX;
    this.slider.style.transform = `translate3d(${positionX}px,0,0)`;
  }

  salvaPosicao(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.6;
    return this.dist.finalDistance - this.dist.movement;
  }
  onEnd(event) {
    const typeEvent = event.type === "mouseup" ? "mousemove" : "touchmove";
    this.wrapper.removeEventListener(typeEvent, this.onHoldClick);
    this.dist.finalDistance = this.movePosition;
  }
  onHoldClick(event) {
    const eventClickType =
      event.type === "mousemove"
        ? event.clientX
        : event.changedTouches[0].clientX;
    const posicao = this.salvaPosicao(eventClickType);
    this.moveSlide(posicao);
  }

  addEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
    this.wrapper.addEventListener("touchstart", this.onStart);
    this.wrapper.addEventListener("touchend", this.onEnd);
  }
  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onHoldClick = this.onHoldClick.bind(this);
  }

  init() {
    this.bindEvents();
    this.addEvents();
  }
}
