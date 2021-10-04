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
<<<<<<< HEAD
  onEnd() {
    this.wrapper.removeEventListener("mousemove", this.onHoldClick);
=======
  onEnd(event) {
    const typeEvent = event.type === "mouseup" ? "mousemove" : "touchmove";
    this.wrapper.removeEventListener(typeEvent, this.onHoldClick);
>>>>>>> 2db14409065b93a3654ec1ad1da718366c1731e7
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
      next: index === totalArray ? undefined : index,
    };
  }

  changeSlide(index) {
    const activeSlide = this.slideArray[index];
    this.moveSlide(activeSlide.position);
    this.slideIndexPosition(index);
    this.dist.finalDistance = activeSlide.position;
  }

  init() {
    this.bindEvents();
    this.addEvents();
    this.slideConfig();
  }
}
