import {Panel} from "../core/Panel";
import {Response} from "../core/Response";

export class SearchPanel extends Panel {
    private expressionInput: HTMLInputElement;
    private sendButton: HTMLButtonElement;

    constructor(private searchPanel: HTMLDivElement, private updateDashboard: (expression: string)=>void) {
        super();
        this.expressionInput = document.createElement("input");
        this.sendButton = document.createElement("button");
        this.searchPanel.appendChild(this.expressionInput);
        this.searchPanel.appendChild(this.sendButton);
        this.setInput(this.expressionInput);
        this.setButton(this.sendButton);
    }

    private setInput(inputElement: HTMLInputElement): void {
        inputElement.id = "expression-input";
        inputElement.classList.add("form-control", "search-panel");
        inputElement.placeholder = "Type LINQ expression, start " +
            "with \"db\" as an indicator of a server database...";
        inputElement.type = "text";
    }

    private setButton(button: HTMLButtonElement): void {
        button.classList.add("search-panel", "btn", "btn-primary");
        button.innerHTML = "Send LINQ expression";
        button.addEventListener("click", this.handleButtonClick.bind(this));
    }

    private handleButtonClick(event: MouseEvent): void {
        const inputLINQ: string = this.expressionInput.value;
        this.updateDashboard('db.Customers.AsQueryable().Where(cus => cus.CustomerID > 5 ' +
            '&& cus.FirstName.StartsWith("Kat")).Take(5).Select(cus => new { cus.EmailAddress })');
        //this.updateDashboard(inputLINQ);
    }

    update(response: Response, expression: string): void {
        this.expressionInput.value = expression;
    }
}
