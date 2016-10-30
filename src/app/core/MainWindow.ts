import {SearchPanel} from "../panels/SearchPanel";
import {MenuPanel} from "../panels/MenuPanel";
import {TreePanel} from "../panels/TreePanel";
import {Response, ServerResponse} from "./Response";
import * as Constants from "../Constants";

export class MainWindow {
    private searchPanel: SearchPanel;
    private menuPanel: MenuPanel;
    private treePanel: TreePanel;

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
            xhr.onreadystatechange = (ev)=> {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    const initialResponse: any = JSON.parse(xhr.responseText);
                    const response: ServerResponse = (<ServerResponse>initialResponse);
                    console.log("done");
                }
            };
            //TODO: to be deleted :)
            expression = 'db.Customers.AsQueryable().Where(cus => cus.CustomerID > 5 ' +
                '&& cus.FirstName.StartsWith("Kat")).Take(5).Select(cus => new { cus.EmailAddress })';
            xhr.send(JSON.stringify(expression));
        } else {
            const errorMessage: string = "You didn't type any LINQ query!";
            const response: Response = {
                resultType: false,
                errorMessage: [errorMessage]
            };
            this.treePanel.update(response);
        }
    }
}