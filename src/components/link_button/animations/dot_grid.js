export default class DotGridAnimation {
  #elementReference;
  #delay;
  #observer;
  constructor({ elementRef, delay = 2 }) {
    try {
      this.#elementReference = elementRef;
      if (!this.#elementReference) {
        throw Error(`The link button with uid:${uid} has no valid references`);
      }
      this.#delay = delay;

      this.render();

      this.#observer = new ResizeObserver(() => {
        this.render();
      });

      this.#observer.observe(this.#elementReference);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    this.#elementReference.replaceChildren();

    const width = this.#elementReference.clientWidth;
    const height = this.#elementReference.clientHeight;

    const computedStyles = getComputedStyle(this.#elementReference);
    const cellSize = parseInt(computedStyles.getPropertyValue("--cell-size"));

    const cols = Math.ceil(width / cellSize);
    const rows = Math.ceil(height / cellSize);

    for (let count = 0; count < cols * rows; ++count) {
      const circle__container = document.createElement("div");
      circle__container.classList.add("circle__container");

      const circle = document.createElement("div");
      circle.classList.add("circle");

      circle.style.animationDelay = `${Math.random() * this.#delay}s`;

      circle__container.appendChild(circle);

      this.#elementReference.appendChild(circle__container);
    }
  }
}
