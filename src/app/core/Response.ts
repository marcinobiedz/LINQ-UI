export interface Response {
    resultType: boolean;
    errorMessage?: string[];
}

export interface ServerResponse {
    isResponseValid: boolean;
    executionTime: number;
    finalCount: number;
    initialCount: number;
    errors: string[];
    tree?: ResponseTreeNode[];
}

export interface ResponseTreeNode {
    ExpressionString: string;
    Id: number;
    ParentId?: number;
    Text: string;
}