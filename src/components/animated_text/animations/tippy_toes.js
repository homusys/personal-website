export default class TippyToesAnimation {
  #elementReference;
  constructor({ elementRef, heightIncrease }) {
    this.#elementReference = elementRef;

    this.#elementReference.addEventListener("mouseenter", (event) => {
      this.#playAnimation();
    });

    /// Mobile device support
    this.#elementReference.addEventListener("pointerdown", (event) => {
      this.#playAnimation();
    });

    this.#elementReference.addEventListener("animationend", (event) => {
      if (event.target === this.#elementReference.lastElementChild) {
        this.#elementReference.classList.remove("running");
      }
    });

    this.render();
  }

  #playAnimation() {
    this.#elementReference.classList.remove("running");

    /// Forces a reflow to restart the animation.
    void this.#elementReference.offsetWidth;

    this.#elementReference.classList.add("running");
  }

  convertTextToArray(text) {
    return text.split("");
  }

  putArrayLettersToSpan(arr) {
    const spanArray = [];

    for (const letter of arr) {
      const newSpan = document.createElement("span");
      newSpan.textContent = letter === " " ? "\u00A0" : letter;
      spanArray.push(newSpan);
    }

    return spanArray;
  }

  render() {
    const textArr = this.convertTextToArray(this.#elementReference.textContent);
    this.#elementReference.textContent = "";

    console.log(textArr);

    const spanArray = this.putArrayLettersToSpan(textArr);

    console.log(spanArray);

    spanArray.forEach((span, index) => {
      // span.style.animationDelay = `${index * 130}ms`;
      span.style.setProperty("--delay", `${index * 130}ms`);
      this.#elementReference.appendChild(span);
    });
  }
}
