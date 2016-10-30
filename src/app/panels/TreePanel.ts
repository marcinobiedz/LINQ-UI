import {Panel} from "../core/Panel";
import {Response} from "../core/Response";

export class TreePanel extends Panel {
    private treeCanvas: SVGSVGElement;
    private errorElement: HTMLDivElement;
    private errorList: HTMLUListElement;

    constructor(private treePanel: HTMLDivElement) {
        super();
        this.treeCanvas = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.errorElement = document.createElement("div");
        this.setErrorElement(this.errorElement);
        this.treePanel.appendChild(this.errorElement);
        this.treePanel.appendChild(this.treeCanvas);
    }

    private setErrorElement(errorElement: HTMLDivElement): void {
        errorElement.classList.add("panel", "panel-danger");
        const errorHeading: HTMLDivElement = document.createElement("div");
        errorHeading.classList.add("panel-heading");
        const errorTitle: HTMLElement = document.createElement("h3");
        errorTitle.classList.add("panel-title");
        errorTitle.innerHTML = "Error!";
        errorHeading.appendChild(errorTitle);
        errorElement.appendChild(errorHeading);
        //set error message
        const errorBody = document.createElement("div");
        errorBody.classList.add("panel-body");
        errorElement.appendChild(errorBody);
        // error list
        this.errorList = document.createElement("ul");
        errorBody.appendChild(this.errorList);
    }

    update(response: Response): void {
        if (response.resultType) {
            this.treeCanvas.style.display = "block";
            this.errorElement.style.display = "none";
            this.updateTreeCanvas(response)
        } else {
            this.treeCanvas.style.display = "none";
            this.errorElement.style.display = "block";
            this.errorList.innerHTML = "";
            response.errorMessage.forEach((message)=> {
                const singleEl: HTMLLIElement = document.createElement("li");
                singleEl.innerHTML = message;
                this.errorList.appendChild(singleEl);
            });
        }
    }

    private updateTreeCanvas(response: Response) {

    }
}