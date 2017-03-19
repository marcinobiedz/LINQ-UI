import {Panel, Updatable} from "./Panel";
import {Response} from "../response/Response";

export class SearchPanel extends Panel implements Updatable {
    private expressionInput: HTMLInputElement;
    private sendButton: HTMLButtonElement;

    constructor(searchPanel: HTMLDivElement, private updateDashboard: (expression: string)=>void) {
        super(searchPanel);
        this.expressionInput = document.createElement("input");
        this.sendButton = document.createElement("button");
        this.mainPanel.appendChild(this.expressionInput);
        this.mainPanel.appendChild(this.sendButton);
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
        // this.updateDashboard('db.SalesOrderDetails.Where(sod => sod.Product.' +
        //     'ProductNumber.StartsWith("aaa")).Select(ob=>ob.UnitPrice)');
        // this.updateDashboard('db.SalesOrderDetails.Join(db.SalesOrderHeaders,' +
        //     'sod => sod.SalesOrderID,' +
        //     'soh => soh.SalesOrderID,' +
        //     '(sod, soh) => new { ID = sod.SalesOrderDetailID, An = soh.AccountNumber })' +
        //     '.Where(obj => obj.An.StartsWith("10-4020-0002"))' +
        //     '.Select(sel => sel.ID)');
        this.updateDashboard(inputLINQ);
    }

    update(response: Response, expression: string): void {
        this.expressionInput.value = expression;
    }
}
