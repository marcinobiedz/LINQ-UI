import {Panel, Updatable} from "../core/Panel";
import {Response} from "../core/Response";

export class HistoryPanel extends Panel implements Updatable {
    public previousQueries: string[] = [];

    constructor(historyPanel: HTMLDivElement) {
        super(historyPanel);

    }

    update(response: Response, expression?: string): void {
        if (response.resultType) {
            if (this.previousQueries.indexOf(expression) < 0) {
                this.previousQueries.push(expression);
            }
        }
    }
}