import "./assets/styles/style.css";
import { IconHandler } from "./assets/icons/icons.js";
import { goldenAppleImage } from "./assets/images/images.js";
import { default as resumePDF } from "./Carl_Matthew_Arzadon_Resume.pdf";


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
        button.classList.add("icon__button--size-l");

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

        const heroIconsConfig = {
            "size": "s"
        }

        dom.addSvgIconToButton(
            "#navBurger",
            iconsHandler.getIconPathDFromId("burger"),
            defaultIconConfig
        );

        dom.addSvgIconToButton(
            "#navThemer",
            iconsHandler.getIconPathDFromId("moon"),
            defaultIconConfig
        );

        dom.addSvgIconToButton(
            "#resumeLink",
            iconsHandler.getIconPathDFromId("download"),
            heroIconsConfig
        );

        dom.addSvgIconToButton(
            "#githubLink",
            iconsHandler.getIconPathDFromId("github"),
            heroIconsConfig
        );

        dom.addSvgIconToButton(
            "#linkedInLink",
            iconsHandler.getIconPathDFromId("linkedin"),
            heroIconsConfig
        );

        dom.addSvgIconToButton(
            "#emailLink",
            iconsHandler.getIconPathDFromId("email"),
            heroIconsConfig
        );
    })
    .then(() => {
        const goldenApple = document.querySelector("#goldenApple");
        goldenApple.setAttribute("src", goldenAppleImage);

        const resumeLink = document.querySelector("#resumeLink");
        resumeLink.setAttribute("href", resumePDF);
    });
