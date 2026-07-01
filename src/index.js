import "./assets/styles/style.css";
import { IconHandler } from "./assets/icons/icons.js";


/**
 * The DOMHandler class is responsible for all the DOM operations.
 */
class DomHandler {
    /**
     * 
     * @param {*} buttonId A CSS selector string of the target button's id attribute.
     * @param {*} pathD The svg path's d attribute.
     */
    addSvgIconToButton(buttonId, pathD, {size}) {
        const VIEWBOX = "0 0 24 24";

        const button = document.querySelector(buttonId);
        if (!button) {
            return;
        }

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", VIEWBOX);
        svg.classList.add("icon");
        this.setSvgIconSize(svg, size);

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", pathD);
        
        svg.appendChild(path);
        button.appendChild(svg);
    }

    setSvgIconSize(svgElement, size="s") {
        switch (size) {
            case "s":
                svgElement.classList.add("icon--size-s");
                break;
            case "m":
                svgElement.classList.add("icon--size-m");
                break;
            case "l":
                svgElement.classList.add("icon--size-l");
                break;
        }
    }   

    // TODO: Create a setter for switching themes (dark and light theme).
}

const dom = new DomHandler();

// Initialize icons to HTML
const iconsHandler = new IconHandler();
iconsHandler.initIcons()
    .then(( iconPaths ) => {
        const defaultIconConfig = {
            "size": "m"
        }
        dom.addSvgIconToButton(
            "#navBurger",
            iconsHandler.getIconPathDFromId("burger"),
            defaultIconConfig
        );
    });
