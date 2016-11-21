import {Panel, Updatable} from "../core/Panel";
import {Response} from "../core/Response";

export class HistoryPanel extends Panel implements Updatable {
    constructor(historyPanel: HTMLDivElement) {
        super(historyPanel);
    }

    update(response: Response, expression?: string): void {
    }
}