import {SearchPanel} from "../panels/SearchPanel";
import {MenuPanel} from "../panels/MenuPanel";
import {TreePanel} from "../panels/TreePanel";
import {Response} from "./Response";
import * as Constants from "../Constants";
import {ServerResponse} from "./ServerResponse";

export class MainWindow {
    private searchPanel: SearchPanel;
    private menuPanel: MenuPanel;
    private treePanel: TreePanel;
    private tempExpression: string = 'db.Customers.AsQueryable().Where(cus => cus.CustomerID > 5 ' +
        '&& cus.FirstName.StartsWith("Kat")).Take(5).Select(cus => new { cus.EmailAddress })';

    constructor(private mainDiv: HTMLDivElement) {
        this.searchPanel = new SearchPanel(<HTMLDivElement>this.mainDiv.querySelector(".search-panel"),
            this.updateDashboard.bind(this));
        this.menuPanel = new MenuPanel(<HTMLDivElement>this.mainDiv.querySelector(".menu-panel"));
        this.treePanel = new TreePanel(<HTMLDivElement>this.mainDiv.querySelector(".tree-panel"));
    }

    private updateDashboard(expression: string): void {
        if (expression.length > 0) {
            const xhr: XMLHttpRequest = new XMLHttpRequest();
            xhr.open(Constants.METHOD, Constants.URL, true);
            xhr.setRequestHeader(Constants.AJAX_HEADERS[0], Constants.AJAX_HEADERS[1]);
            xhr.addEventListener("readystatechange", this.handleServerRequest.bind(this));
            xhr.send(JSON.stringify(this.tempExpression));
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
        }
    }
}