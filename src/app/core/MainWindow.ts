import {SearchPanel} from "../panels/SearchPanel";
import {MenuPanel} from "../panels/MenuPanel";
import {TreePanel} from "../panels/TreePanel";
import {Response} from "./Response";

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

        } else {
            const errorMessage: string = "You didn't type any LINQ query!";
            const response: Response = {
                resultType: 0,
                errorMessage: errorMessage
            };
            this.treePanel.update(response);
        }
    }
}