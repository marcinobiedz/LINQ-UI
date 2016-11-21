import {Response} from "./Response";
export class Panel {
    constructor(protected mainPanel: HTMLDivElement) {
    }

    public toggle(show: boolean): void {
        this.mainPanel.hidden = show;
    }
}

export interface Updatable {
    update(response: Response, expression?: string): void;
}