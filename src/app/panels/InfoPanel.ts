import {Panel, Updatable} from "./Panel";
import {Response} from "../response/Response";
import {render} from "../renderers/InfoChart";
import {ChartAPI} from "c3";
import {TableInfo, ServerChartResponse} from "../response/ServerResponse";
import {Constants} from "../core/Constants";

export class InfoPanel extends Panel implements Updatable {
    private chartPanel: HTMLDivElement;
    private tablePanel: HTMLDivElement;
    private timeoutAlert: HTMLDivElement;
    private tableBody: HTMLElement;
    private chartAPI: ChartAPI;
    private downloadButton: HTMLButtonElement;
    private initialCounts: number[];
    private finalCounts: number[];
    private executionTimes: number[];
    private tablesInfo: TableInfo[];

    constructor(infoPanel: HTMLDivElement) {
        super(infoPanel);
        this.chartPanel = document.createElement("div");
        this.chartPanel.id = "chart-panel";
        this.chartPanel.classList.add("chart-panel");
        this.mainPanel.appendChild(this.chartPanel);
        this.tablePanel = document.createElement("div");
        this.tablePanel.id = "table-panel";
        this.tablePanel.classList.add("table-panel");
        this.downloadButton = document.createElement("button");
        this.downloadButton.classList.add("btn", "btn-success");
        this.downloadButton.innerText = "Download CSV";
        this.mainPanel.appendChild(this.tablePanel);
        this.createTable();
        this.timeoutAlert = document.createElement("div");
        this.timeoutAlert.classList.add("alert", "alert-danger", "info-alert");
        this.timeoutAlert.id = "info-alert";
        this.timeoutAlert.innerText = "TIMEOUT! Your chart request has timed out, try again :(";
        this.mainPanel.appendChild(this.timeoutAlert);
        this.timeoutAlert.hidden = true;
        this.chartPanel.hidden = true;
        this.tablePanel.hidden = true;
    }

    update(response: Response, expression?: string): void {
        this.timeoutAlert.hidden = true;
        if (response.resultType) {
            this.chartPanel.hidden = false;
            this.tablePanel.hidden = false;
            this.chartAPI = render(this.chartPanel, <ServerChartResponse>response.serverResponse);
            this.updateTable(<ServerChartResponse>response.serverResponse);
        } else if (!response.resultType && response.errorMessage[0] === Constants.TIMEOUT) {
            this.timeoutAlert.hidden = false;
        } else {
            this.chartPanel.hidden = true;
            this.tablePanel.hidden = true;
        }
    }

    private updateTable(response: ServerChartResponse): void {
        this.tableBody.innerHTML = "";
        this.clearTables();
        this.fillTables(response);
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
        labels.forEach(label => {
            const header = document.createElement("th");
            header.innerHTML = label;
            header.style.textAlign = "center";
            headers.appendChild(header);
        });
        table.appendChild(headers);
        this.tableBody = document.createElement("tbody");
        table.appendChild(this.tableBody);
        this.tablePanel.appendChild(table);
        this.tablePanel.appendChild(this.downloadButton);
        this.downloadButton.addEventListener("click", this.downloadCSV.bind(this));
    }

    private downloadCSV(event: MouseEvent): void {
        const element: HTMLAnchorElement = document.createElement("a");
        element.href = Constants.CSV + this.createFile();
        element.download = Constants.FILENAME;
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    private createFile(): string {
        const header: string = "Table;Count\n";
        const tables: string = this.tablesInfo.reduce((acc, table) => {
            return acc += table.TableName + ";" + table.TableCount + "\n";
        }, "");
        const sep: string = "\n";
        let results: string = "Initial count;Final count;Execution time\n";
        for (let i = 0; i < this.executionTimes.length; i++) {
            results += this.initialCounts[i] + ";" +
                this.finalCounts[i].toString() + ";" +
                this.executionTimes[i].toString() + "\n"
        }
        return encodeURIComponent(header + tables + sep + results);
    }

    private fillTables(response: ServerChartResponse): void {
        this.executionTimes = response.executionTimes;
        this.initialCounts = response.initialCounts;
        this.finalCounts = response.finalCounts;
        this.tablesInfo = response.tablesInfo;
    }

    private clearTables(): void {
        this.executionTimes = [];
        this.tablesInfo = [];
        this.initialCounts = [];
        this.finalCounts = [];
    }
}