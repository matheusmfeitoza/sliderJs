export default class Slider {
  constructor(slider, wrapper) {
    this.slider = document.querySelector(slider);
    this.wrapper = document.querySelector(wrapper);
    this.dist = { finalDistance: 0, startX: 0, movement: 0 };
  }

  onStart(event) {
    event.preventDefault();
    this.dist.startX = event.clientX;
    this.wrapper.addEventListener("mousemove", this.onHoldClick);
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
    this.wrapper.removeEventListener("mousemove", this.onHoldClick);
    this.dist.finalDistance = this.movePosition;
  }
  onHoldClick(event) {
    const posicao = this.salvaPosicao(event.clientX);
    this.moveSlide(posicao);
  }

  addEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
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
