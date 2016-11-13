import {Panel} from "../core/Panel";
import {Response} from "../core/Response";
import {render} from "../renderers/InfoChart";
import {ChartAPI} from "c3";
import {ServerResponse} from "../core/ServerResponse";

export class InfoPanel extends Panel {
    private chartPanel: HTMLDivElement;
    private tablePanel: HTMLDivElement;
    private tableBody: HTMLElement;
    private chartAPI: ChartAPI;

    constructor(private infoPanel: HTMLDivElement) {
        super();
        this.infoPanel.hidden = true;
        this.chartPanel = document.createElement("div");
        this.chartPanel.id = "chart-panel";
        this.chartPanel.classList.add("chart-panel");
        this.infoPanel.appendChild(this.chartPanel);
        this.tablePanel = document.createElement("div");
        this.tablePanel.id = "table-panel";
        this.tablePanel.classList.add("table-panel");
        this.infoPanel.appendChild(this.tablePanel);
        this.createTable();
    }

    update(response: Response, expression?: string): void {
        if (response.resultType) {
            this.infoPanel.hidden = false;
            this.chartAPI = render(this.chartPanel, response.serverResponse);
            this.updateTable(response.serverResponse);
        } else {
            this.infoPanel.hidden = true;
        }
    }

    private updateTable(response: ServerResponse): void {
        this.tableBody.innerHTML = "";
        for (let i: number = 0; i < response.executionTimes.length; i++) {
            const row = document.createElement("tr");
            row.innerHTML = "<td>" + (i + 1) + "</td>" +
                "<td>" + response.initialCounts[i] + "</td>" +
                "<td>" + response.finalCounts[i] + "</td>" +
                "<td>" + response.executionTimes[i] + " ticks</td>";
            this.tableBody.appendChild(row);
        }
    }

    private createTable(): void {
        const table = document.createElement("table");
        table.classList.add("table", "table-bordered", "table-hover");
        const headers = document.createElement("thead");
        const labels = ["#", "Initial count", "Final count", "Execution time"];
        labels.forEach(label=> {
            const header = document.createElement("th");
            header.innerHTML = label;
            header.style.textAlign = "center";
            headers.appendChild(header);
        });
        table.appendChild(headers);
        this.tableBody = document.createElement("tbody");
        table.appendChild(this.tableBody);
        this.tablePanel.appendChild(table);
    }
}