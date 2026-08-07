export default class TippyToesAnimation {
  #elementReference;
  constructor({ elementRef, heightIncrease }) {
    this.#elementReference = elementRef;

    // this.#elementReference.addEventListener("mouseenter", (event) => {
    //   this.#playAnimation();
    // });

    // /// Mobile device support
    // this.#elementReference.addEventListener("pointerdown", (event) => {
    //   this.#playAnimation();
    // });

    this.#elementReference.addEventListener("animationend", (event) => {
      if (event.target === this.#elementReference.lastElementChild) {
        this.#elementReference.classList.remove("running");

        setTimeout(() => {
          this.#playAnimation();
        }, 4000);
      }
    });

    this.render();
    this.#playAnimation();
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
      newSpan.classList.add("tippy-toes-lite");
      spanArray.push(newSpan);
    }

    return spanArray;
  }

  render() {
    const textArr = this.convertTextToArray(
      this.#elementReference.textContent.trim(),
    );

    this.#elementReference.textContent = "";

    const spanArray = this.putArrayLettersToSpan(textArr);

    spanArray.forEach((span, index) => {
      span.style.setProperty("--delay", `${index * 130}ms`);
      this.#elementReference.appendChild(span);
    });
  }
}
