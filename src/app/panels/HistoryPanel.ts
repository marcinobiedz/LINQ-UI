import {Panel, Updatable} from "../core/Panel";
import {Response} from "../core/Response";

export class HistoryPanel extends Panel implements Updatable {
    public previousQueries: string[] = [];
    private historyList: HTMLDivElement;

    constructor(historyPanel: HTMLDivElement, private updateDashboard: (expression: string)=>void) {
        super(historyPanel);
        this.historyList = document.createElement("div");
        this.historyList.classList.add("list-group");
        this.mainPanel.appendChild(this.historyList);
        this.mainPanel.addEventListener("click", this.handleClick.bind(this));
    }

    update(response: Response, expression?: string): void {
        if (response.resultType) {
            if (this.previousQueries.indexOf(expression) < 0) {
                this.previousQueries.push(expression);
                const a: HTMLAnchorElement = document.createElement("a");
                a.id = "query-" + (this.previousQueries.length - 1);
                a.classList.add("list-group-item");
                a.innerHTML = expression;
                this.historyList.appendChild(a);
            }
        }
    }

    private handleClick(event: Event): void {
        const id = (<HTMLElement>event.target).id.split('-')[1];
        this.updateDashboard(this.previousQueries[parseInt(id)]);
    }
}