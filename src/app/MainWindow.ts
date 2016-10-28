import {SearchPanel} from "./SearchPanel";
import {MenuPanel} from "./MenuPanel";

export class MainWindow {
    private searchPanel: SearchPanel;
    private menuPanel: MenuPanel;

    constructor(private mainDiv: HTMLDivElement) {
        this.searchPanel = new SearchPanel(<HTMLDivElement>this.mainDiv.querySelector(".search-panel"));
        this.menuPanel = new MenuPanel(<HTMLDivElement>this.mainDiv.querySelector(".menu-panel"));
    }
}