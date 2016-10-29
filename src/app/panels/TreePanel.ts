import {Panel} from "../core/Panel";
import {Response} from "../core/Response";

export class TreePanel extends Panel {
    private treeCanvas: SVGSVGElement;
    private errorElement: HTMLDivElement;
    private errorBody: HTMLDivElement;

    constructor(private treePanel: HTMLDivElement) {
        super();
        this.treeCanvas = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.errorElement = document.createElement("div");
        this.setErrorElement(this.errorElement);
        this.treePanel.appendChild(this.errorElement);
    }

    private setErrorElement(errorElement: HTMLDivElement): void {
        errorElement.classList.add("panel", "panel-danger");
        const errorHeading: HTMLDivElement = document.createElement("div");
        errorHeading.classList.add("panel-heading");
        this.errorBody = document.createElement("div");
        this.errorBody.classList.add("panel-body");
        const errorTitle: HTMLElement = document.createElement("h3");
        errorTitle.classList.add("panel-title");
        errorTitle.innerHTML = "Error!";
        errorHeading.appendChild(errorTitle);
        errorElement.appendChild(errorHeading);
        errorElement.appendChild(this.errorBody);
        this.errorBody.innerHTML = "Error message not precised !";
    }

    update(response: Response): void {
        if (response.resultType) {

        } else {
            this.errorBody.innerHTML = response.errorMessage;
        }
    }
}