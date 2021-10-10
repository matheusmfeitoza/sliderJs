export default class Slider {
  constructor(slider, wrapper) {
    this.slider = document.querySelector(slider);
    this.wrapper = document.querySelector(wrapper);
    this.dist = { finalDistance: 0, startX: 0, movement: 0 };
  }

  transition(value) {
    this.slider.style.transition = value ? "transform .3s" : "";
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
    this.transition(false);
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
    this.transition(true);
    this.onMovement();
  }
  onHoldClick(event) {
    const eventClickType =
      event.type === "mousemove"
        ? event.clientX
        : event.changedTouches[0].clientX;
    const posicao = this.salvaPosicao(eventClickType);
    this.moveSlide(posicao);
  }

  onMovement() {
    if (this.dist.movement > 120 && this.index.next !== undefined) {
      this.slideNextNav();
    } else if (this.dist.movement < -120 && this.index.last !== undefined) {
      this.slidePrevNav();
    } else {
      this.changeSlide(this.index.actual);
    }
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

  slidePosition(slide) {
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  slideConfig() {
    this.slideArray = [...this.slider.children].map((element) => {
      const position = this.slidePosition(element);
      return { element, position };
    });
  }

  slideIndexPosition(index) {
    const totalArray = this.slideArray.length - 1;
    this.index = {
      last: index ? index - 1 : undefined,
      actual: index,
      next: index === totalArray ? undefined : index + 1,
    };
  }

  changeSlide(index) {
    const activeSlide = this.slideArray[index];
    this.moveSlide(activeSlide.position);
    this.slideIndexPosition(index);
    this.dist.finalDistance = activeSlide.position;
  }

  slidePrevNav() {
    if (this.index.last !== undefined) this.changeSlide(this.index.last);
  }

  slideNextNav() {
    if (this.index.next !== undefined) this.changeSlide(this.index.next);
  }

  init() {
    this.bindEvents();
    this.transition(false);
    this.addEvents();
    this.slideConfig();
    this.changeSlide(0);
  }
}
