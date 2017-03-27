export class Constants {
    private static _TREE_URL: string;
    private static _CHART_URL: string;
    public static DB_SCHEMA_ID: string = "dbschema";
    public static METHOD: string = "POST";
    public static TIMEOUT: string = "TIMEOUT";
    public static CSV: string = "data:text/csv;charset=utf-8,";
    public static FILENAME: string = "table.csv";
    public static AJAX_HEADERS: string[] = [
        "Content-Type",
        "application/json;charset=UTF-8"
    ];

    static set URL(url: string) {
        Constants._TREE_URL = "http://" + url + "/api/exptree";
        Constants._CHART_URL = "http://" + url + "/api/chart";
    }

    static get CHART_URL(): string {
        return Constants._CHART_URL;
    }

    static get TREE_URL(): string {
        return Constants._TREE_URL;
    }
}