export interface ServerResponse {
    isResponseValid: boolean;
    executionTimes: number[];
    finalCounts: number[];
    initialCounts: number[];
    errors: string[];
    tree?: ResponseTreeNode[];
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