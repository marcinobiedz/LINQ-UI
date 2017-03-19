import {Response} from "../response/Response";
export class Panel {
    constructor(protected mainPanel: HTMLDivElement) {
    }

    public hide(show: boolean): void {
        this.mainPanel.hidden = show;
    }
}

export interface Updatable {
    update(response: Response, expression?: string): void;
}

export type Launcher = {
    label: string;
    launcher: EventListener;
    hasIcon: boolean;
    iconName: string;
}