import {SearchPanel} from "../panels/SearchPanel";
import {MenuPanel} from "../panels/MenuPanel";
import {TreePanel} from "../panels/TreePanel";
import {Response} from "./Response";
import * as Constants from "../Constants";
import {InfoPanel} from "../panels/InfoPanel";
import {HistoryPanel} from "../panels/HistoryPanel";

export class MainWindow {
    private searchPanel: SearchPanel;
    private menuPanel: MenuPanel;
    private treePanel: TreePanel;
    private infoPanel: InfoPanel;
    private historyPanel: HistoryPanel;
    private currentExpression: string;

    constructor(private mainDiv: HTMLDivElement) {
        this.searchPanel = new SearchPanel(<HTMLDivElement>this.mainDiv.querySelector(".search-panel"),
            this.updateDashboard.bind(this));
        this.menuPanel = new MenuPanel(<HTMLDivElement>this.mainDiv.querySelector(".menu-panel"), [
                {
                    label: "Tree visualization",
                    launcher: this.showTree.bind(this),
                    hasIcon: true,
                    iconName: "glyphicon-tree-conifer"
                },
                {
                    label: "History",
                    launcher: this.showHistory.bind(this),
                    hasIcon: true,
                    iconName: "glyphicon-book"
                }
            ]
        );
        this.treePanel = new TreePanel(<HTMLDivElement>this.mainDiv.querySelector(".tree-panel"));
        this.infoPanel = new InfoPanel(<HTMLDivElement>this.mainDiv.querySelector(".info-panel"));
        this.historyPanel = new HistoryPanel(<HTMLDivElement>this.mainDiv.querySelector(".history-panel"));
        this.showTree();
    }

    private updateDashboard(expression: string): void {
        this.showTree();
        this.menuPanel.markItem(0);
        if (expression.length > 0) {
            expression = expression.replace(/\s+/g, '');
            this.currentExpression = expression;
            this.searchPanel.update(new Response(), expression);
            const xhr: XMLHttpRequest = new XMLHttpRequest();
            xhr.open(Constants.METHOD, Constants.URL, true);
            xhr.setRequestHeader(Constants.AJAX_HEADERS[0], Constants.AJAX_HEADERS[1]);
            xhr.addEventListener("readystatechange", this.handleServerRequest.bind(this));
            xhr.send(JSON.stringify(expression));
        } else {
            const response = new Response();
            response.errorMessage.push("You didn't type any LINQ query!");
            this.treePanel.update(response);
            this.infoPanel.update(response);
        }
    }

    private handleServerRequest(event: Event): void {
        if ((<XMLHttpRequest>event.target).readyState === XMLHttpRequest.DONE
            && (<XMLHttpRequest>event.target).status === 200) {
            const response: Response = new Response();
            response.serverResponse = JSON.parse((<XMLHttpRequest>event.target).responseText);
            response.resultType = response.serverResponse.isResponseValid;
            response.errorMessage = response.serverResponse.errors;
            this.treePanel.update(response);
            this.infoPanel.update(response);
            this.historyPanel.update(response, this.currentExpression);
        }
    }

    private showTree(): void {
        this.historyPanel.hide(true);
        this.treePanel.hide(false);
        this.infoPanel.hide(false);
    }

    private showHistory(): void {
        this.historyPanel.hide(false);
        this.treePanel.hide(true);
        this.infoPanel.hide(true);
    }
}