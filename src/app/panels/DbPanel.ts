import {Updatable, Panel} from "./Panel";
import {Response} from "../response/Response";
import {DbRenderer} from "../renderers/DbRenderer";

export class DbPanel extends Panel implements Updatable {
    private dbRenderer: DbRenderer;

    constructor(dbPanel: HTMLDivElement) {
        super(dbPanel);
        this.dbRenderer = new DbRenderer(this.mainPanel);
    }

    public hide(show: boolean): void {
        this.mainPanel.hidden = show;
        if (show) {
            this.eraseSchema();
        } else {
            this.drawSchema();
        }
    }

    private drawSchema(): void {
        this.dbRenderer.renderDbSchema();
    }

    private eraseSchema(): void {
        this.mainPanel.innerHTML = "";
    }

    update(response: Response, expression?: string): void {
    }
}