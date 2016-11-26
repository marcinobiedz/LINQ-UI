export interface ServerResponse {
    isResponseValid: boolean;
    executionTimes: number[];
    finalCounts: number[];
    initialCounts: number[];
    errors: string[];
    tree?: ResponseTreeNode[];
}

export interface ResponseTreeNode {
    ExpressionString: string;
    Id: number;
    ParentId?: number;
    NodeText?: string;
    Text: string;
}