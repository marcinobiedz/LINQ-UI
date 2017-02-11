const urls: string[] = ['localhost:49607', '192.168.2.3:9090'];
export const DB_SCHEMA_ID: string = "dbschema";
export const METHOD: string = "POST";
export const TIMEOUT: string = "TIMEOUT";
export const CSV: string = "data:text/csv;charset=utf-8,";
export const FileName: string = "table.csv";
export const TREE_URL: string = "http://" + urls[0] + "/api/exptree";
export const CHART_URL: string = "http://" + urls[0] + "/api/chart";
export const AJAX_HEADERS: string[] = [
    "Content-Type",
    "application/json;charset=UTF-8"
];