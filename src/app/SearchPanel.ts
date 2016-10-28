export class SearchPanel {
    private expressionInput: HTMLInputElement;
    private sendButton: HTMLButtonElement;

    constructor(private searchPanel: HTMLDivElement) {
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
        //button.addEventListener("click", this.handleButtonClick);
    }

    private handleButtonClick(event: MouseEvent): void {
        alert("test click");
    }
}