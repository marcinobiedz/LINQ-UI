import {Panel} from "../core/Panel";
import {Response} from "../core/Response";

export class HistoryPanel extends Panel {
    constructor(private historyPanel: HTMLDivElement) {
        super();
        this.historyPanel.hidden = true;
    }

    toggle(show: boolean): void {
        this.historyPanel.hidden = show;
    }

    update(response: Response, expression?: string): void {
    }
}