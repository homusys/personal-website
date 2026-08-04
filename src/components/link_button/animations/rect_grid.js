export default class RectGridAnimation {
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

    const cols = Math.ceil(width / 50);
    const rows = Math.ceil(height / 30);

    this.#elementReference.style.setProperty("--cols", cols);
    this.#elementReference.style.setProperty("--rows", rows);

    for (let count = 0; count < cols * rows; ++count) {
      const rect__container = document.createElement("div");
      rect__container.classList.add("rect__container");

      const rect = document.createElement("div");
      rect.classList.add("rect");

      rect.style.animationDelay = `${Math.random() * this.#delay}s`;

      rect__container.appendChild(rect);
      this.#elementReference.appendChild(rect__container);
    }
  }
}
