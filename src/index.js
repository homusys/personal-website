import "./assets/styles/style.css";
import { IconHandler } from "./assets/icons/icons.js";
import { goldenAppleImage } from "./assets/images/images.js";
import profilePic from "./assets/images/profile.png";
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


    collectionBuilder() {
        const stack = new Set();
        const add = (item) => {
            if (typeof item !== "string") {
                throw new Error(
                "The item being added to the tech stack is not a String.",
                );
            }
            stack.add(item);
        }
        const getStack = () => {
            return stack;
        }

        return { add, getStack };
    }


    addToTechStackCollection(targetId, ...stackItems) {
        const collection = document.querySelector(targetId);

        for (const item of stackItems[0]) {
            const stackItem = document.createElement("span");
            stackItem.classList.add("stack__item");
            stackItem.textContent = item;
            collection.appendChild(stackItem);
        }
        
    }


    createExpCard(imageSrc, title, company, startEndDate, ...stackItems) {
        const IMG_PLACEHOLD = "https://placehold.co/600x400/000000/fff?text=this+is+a+placeholder+image";

        const expColl = document.querySelector("#expColl");
        
        const expCard = document.createElement("div");
        expCard.classList.add("exp__card");
        
        const cardImage = document.createElement("figure");
        cardImage.classList.add("card__image")
        
        const img = document.createElement("img");
        img.src = (!imageSrc) ? IMG_PLACEHOLD : imageSrc;

        const cardDetails = document.createElement("div");
        cardDetails.classList.add("card__details");
        
        const header = document.createElement("h3");
        header.textContent = title;
        header.classList.add("font-header");

        const companyP = document.createElement("p");
        companyP.textContent = company;

        const startEndDateP = document.createElement("p");
        startEndDateP.textContent = startEndDate;

        const techUsed = document.createElement("div");
        techUsed.classList.add("tech__used");

        for (const item of stackItems[0]) {
            const stackItem = document.createElement("span");
            stackItem.classList.add("stack__item");
            stackItem.textContent = item;
            techUsed.appendChild(stackItem);
        }

        const link = document.createElement("a");
        link.classList.add("card__link");
        link.href = "";
        link.textContent = "Click for more details";

        cardImage.appendChild(img);

        cardDetails.appendChild(header);
        cardDetails.appendChild(companyP);
        cardDetails.appendChild(startEndDateP);
        
        expCard.appendChild(cardImage);
        expCard.appendChild(cardDetails);
        expCard.appendChild(techUsed);
        expCard.appendChild(link);

        expColl.appendChild(expCard);
    }

    // TODO: Create a setter for switching themes (dark and light theme).
}

const dom = new DomHandler();
const techStack = dom.collectionBuilder();
techStack.add("HTML");
techStack.add("CSS");
techStack.add("JavaScript");
techStack.add("Python");
techStack.add("C");
techStack.add("Java");
techStack.add("Laravel");
techStack.add("Flask");
techStack.add("Tailwind CSS");
techStack.add("Bootstrap");
techStack.add("PyQt5");
techStack.add("SQL Alchemy");
techStack.add("SQLite");
techStack.add("MySQL");
techStack.add("PostgreSQL");
techStack.add("Git");
techStack.add("GitHub");
dom.addToTechStackCollection("#stackColl", techStack.getStack());

const exp1 = dom.collectionBuilder();
exp1.add("HTML");
exp1.add("CSS");
exp1.add("Tailwind CSS");
exp1.add("JavaScript");
exp1.add("PHP");
exp1.add("Laravel");
exp1.add("MySQL");
exp1.add("Git");
exp1.add("GitHub");
dom.createExpCard(
    null,
    "Web Developer Intern",
    "Department of the Interior and Local Government - Cordillera Administrative Region",
    "June 2025 - August 2025",
    exp1.getStack()
);

// Initialize icons to HTML
const iconsHandler = new IconHandler();
iconsHandler.initIcons()
    .then(( iconPaths ) => {
        const defaultIconConfig = {
            "size": "m"
        }

        const heroIconsConfig = {
            "size": "l"
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
        const heroProfilePic = document.querySelector("#profilePic");
        heroProfilePic.setAttribute("src", profilePic);

        const resumeLink = document.querySelector("#resumeLink");
        resumeLink.setAttribute("href", resumePDF);
    });

    