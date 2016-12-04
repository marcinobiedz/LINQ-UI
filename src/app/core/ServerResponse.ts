export interface ServerTreeResponse {
    isResponseValid: boolean;
    errors: string[];

    tree?: ResponseTreeNode[];
}

export interface ServerChartResponse {
    isResponseValid: boolean;
    errors: string[];

    executionTimes: number[];
    finalCounts: number[];
    initialCounts: number[];
    tablesInfo: TableInfo[];
}

export interface ResponseTreeNode {
    ExpressionString: string;
    Id: number;
    ParentId?: number;
    NodeText?: string;
    Text: string;
}

export type TableInfo = {
    TableName: string;
    TableCount: number;
}