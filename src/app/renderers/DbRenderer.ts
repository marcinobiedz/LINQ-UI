import {Constants} from "../core/Constants";

export class DbRenderer {
    private canvas: HTMLDivElement;

    constructor(canvas: HTMLDivElement) {
        this.canvas = canvas;
    }

    renderDbSchema() {
        this.canvas.id = Constants.DB_SCHEMA_ID;
    }
}