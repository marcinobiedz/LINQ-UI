import {SearchPanel} from "./panels/SearchPanel";
import {MenuPanel} from "./panels/MenuPanel";
import {TreePanel} from "./panels/TreePanel";
import {Response} from "./response/Response";
import {InfoPanel} from "./panels/InfoPanel";
import {HistoryPanel} from "./panels/HistoryPanel";
import {DbPanel} from "./panels/DbPanel";
import {Constants} from "./core/Constants";
import {PanelConfig} from "./core/PanelConfig";

export class MainWindow {
    private searchPanel: SearchPanel;
    private menuPanel: MenuPanel;
    private treePanel: TreePanel;
    private infoPanel: InfoPanel;
    private dbPanel: DbPanel;
    private historyPanel: HistoryPanel;
    private currentExpression: string;

    constructor(private mainDiv: HTMLDivElement, config: PanelConfig) {
        Constants.URL = config.url;
        this.searchPanel = new SearchPanel(<HTMLDivElement>this.mainDiv.querySelector(".search-panel"),
            this.updateDashboard.bind(this));
        this.dbPanel = new DbPanel(<HTMLDivElement>this.mainDiv.querySelector(".db-panel"));
        this.menuPanel = new MenuPanel(<HTMLDivElement>this.mainDiv.querySelector(".menu-panel"), [
                {
                    label: "Tree visualization",
                    launcher: this.showTree.bind(this),
                    hasIcon: true,
                    iconName: "glyphicon-tree-conifer"
                },
                {
                    label: "DB Schema",
                    launcher: this.showDB.bind(this),
                    hasIcon: true,
                    iconName: "glyphicon-list-alt"
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
        this.historyPanel = new HistoryPanel(<HTMLDivElement>this.mainDiv.querySelector(".history-panel"),
            this.updateDashboard.bind(this));
        this.showTree();
    }

    private updateDashboard(expression: string): void {
        this.showTree();
        this.menuPanel.markItem(0);
        if (expression.length > 0) {
            expression = expression.replace(/\s+/g, '');
            this.currentExpression = expression;
            this.searchPanel.update(new Response(), expression);
            //chart request =======================================
            const chartXhr: XMLHttpRequest = new XMLHttpRequest();
            chartXhr.open(Constants.METHOD, Constants.CHART_URL, true);
            chartXhr.timeout = 60000;
            chartXhr.setRequestHeader(Constants.AJAX_HEADERS[0], Constants.AJAX_HEADERS[1]);
            chartXhr.addEventListener("readystatechange", this.handleServerChartRequest.bind(this));
            chartXhr.ontimeout = this.handleTimeout.bind(this);
            chartXhr.send(JSON.stringify(expression));
            // tree request =====================================
            const treeXhr: XMLHttpRequest = new XMLHttpRequest();
            treeXhr.open(Constants.METHOD, Constants.TREE_URL, true);
            treeXhr.setRequestHeader(Constants.AJAX_HEADERS[0], Constants.AJAX_HEADERS[1]);
            treeXhr.addEventListener("readystatechange", this.handleServerTreeRequest.bind(this));
            treeXhr.send(JSON.stringify(expression));
        } else {
            const response = new Response();
            response.errorMessage.push("You didn't type any LINQ query!");
            this.treePanel.update(response);
            this.infoPanel.update(response);
        }
    }

    private handleServerTreeRequest(event: Event): void {
        if ((<XMLHttpRequest>event.target).readyState === XMLHttpRequest.DONE
            && (<XMLHttpRequest>event.target).status === 200) {
            const response: Response = new Response();
            response.serverResponse = JSON.parse((<XMLHttpRequest>event.target).responseText);
            response.resultType = response.serverResponse.isResponseValid;
            response.errorMessage = response.serverResponse.errors;
            this.treePanel.update(response);
            this.historyPanel.update(response, this.currentExpression);
        }
    }

    private handleServerChartRequest(event: Event): void {
        if ((<XMLHttpRequest>event.target).readyState === XMLHttpRequest.DONE
            && (<XMLHttpRequest>event.target).status === 200) {
            const response: Response = new Response();
            response.serverResponse = JSON.parse((<XMLHttpRequest>event.target).responseText);
            response.resultType = response.serverResponse.isResponseValid;
            response.errorMessage = response.serverResponse.errors;
            this.infoPanel.update(response);
        }
    }

    private handleTimeout(event: Event): void {
        const response = new Response();
        response.errorMessage.push(Constants.TIMEOUT);
        response.errorMessage.push("Server session timed out! Try again :(");
        this.infoPanel.update(response);
    }

    private showTree(): void {
        this.historyPanel.hide(true);
        this.treePanel.hide(false);
        this.infoPanel.hide(false);
        this.dbPanel.hide(true);
    }

    private showHistory(): void {
        this.historyPanel.hide(false);
        this.treePanel.hide(true);
        this.infoPanel.hide(true);
        this.dbPanel.hide(true);
    }

    private showDB(): void {
        this.historyPanel.hide(true);
        this.treePanel.hide(true);
        this.infoPanel.hide(true);
        this.dbPanel.hide(false);
    }
}