import {SearchPanel} from "../panels/SearchPanel";
import {MenuPanel} from "../panels/MenuPanel";
import {TreePanel} from "../panels/TreePanel";
import {Response} from "./Response";
import * as Constants from "../Constants";
import {ServerResponse} from "./ServerResponse";
import {InfoPanel} from "../panels/InfoPanel";

export class MainWindow {
    private searchPanel: SearchPanel;
    private menuPanel: MenuPanel;
    private treePanel: TreePanel;
    private infoPanel: InfoPanel;
    private currentExpression: string;

    constructor(private mainDiv: HTMLDivElement) {
        this.searchPanel = new SearchPanel(<HTMLDivElement>this.mainDiv.querySelector(".search-panel"),
            this.updateDashboard.bind(this));
        this.menuPanel = new MenuPanel(<HTMLDivElement>this.mainDiv.querySelector(".menu-panel"));
        this.treePanel = new TreePanel(<HTMLDivElement>this.mainDiv.querySelector(".tree-panel"));
        this.infoPanel = new InfoPanel(<HTMLDivElement>this.mainDiv.querySelector(".info-panel"))
    }

    private updateDashboard(expression: string): void {
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
            this.menuPanel.update(response, this.currentExpression);
        }
    }
}