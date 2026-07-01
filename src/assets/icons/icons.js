import iconsSvg from "./icons.svg";

export class IconHandler {
    #iconPaths = new Map();

    async initIcons() {
        const response = await fetch(iconsSvg);
        const parser = new DOMParser();
        const svg = parser.parseFromString(await response.text(), "image/svg+xml");
        const allSymbols = svg.querySelectorAll("symbol");
        for (const symbol of allSymbols) {
            const path = symbol.querySelector("path");
            this.addSymbolToIconPaths(symbol.id, path.getAttribute("d"));
        }
        return this.#iconPaths;
    }

    addSymbolToIconPaths(symbolId, pathD) {
        this.#iconPaths.set(symbolId, pathD);
    }

    getIconPathDFromId(symbolId) {
        return this.#iconPaths.get(symbolId);
    }
}