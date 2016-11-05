import {Panel} from "../core/Panel";
import {Response} from "../core/Response";
import {ResponseTreeNode} from "../core/ServerResponse";
export class InfoPanel extends Panel {
    private panelList: HTMLUListElement;
    private infos: Array<[string,string]> = [
        ["executionTime", "Execution time:"],
        ["initialCount", "Initial count:"],
        ["finalCount", "Final count"]
    ];

    constructor(private infoPanel: HTMLDivElement) {
        super();
        this.panelList = document.createElement("ul");
        this.panelList.classList.add("list-group");
        this.panelList.hidden = true;
        this.createPanelListItems(this.panelList);
        infoPanel.appendChild(this.panelList);
    }

    update(response: Response, expression?: string): void {
        if (response.resultType) {
            this.panelList.hidden = false;
            Object.keys(response.serverResponse).forEach(key=> {
                this.updateSpanValues(key, response.serverResponse[key]);
            });
        } else {
            this.panelList.hidden = true;
        }
    }

    private updateSpanValues(key: string, value: boolean | number | Array<ResponseTreeNode>): void {
        const spanElem: HTMLSpanElement = document.getElementById("info-panel-" + key);
        if (spanElem != null) {
            const newValue: string= value.toString();
            key ==="executionTime"
                ?spanElem.innerHTML=newValue+" ticks"
                :spanElem.innerHTML=newValue;
        }
    }

    private createPanelListItems(panelList: HTMLUListElement): void {
        this.infos.forEach(info=> {
            const singleLi: HTMLLIElement = document.createElement("li");
            singleLi.classList.add("list-group-item");
            panelList.appendChild(singleLi);
            const spanElem: HTMLSpanElement = document.createElement("span");
            spanElem.classList.add("right-info");
            spanElem.id = "info-panel-" + info[0];
            singleLi.appendChild(spanElem);
            singleLi.innerHTML += info[1]
        });
    }
}