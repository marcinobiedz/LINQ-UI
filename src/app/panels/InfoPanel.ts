import {Panel} from "../core/Panel";
import {Response} from "../core/Response";
export class InfoPanel extends Panel {
    constructor(private infoPanel: HTMLDivElement) {
        super();
    }

    update(response: Response, expression?: string): void {
        if (response.resultType) {

        } else {

        }
    }
}