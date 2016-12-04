import {ServerChartResponse, ServerTreeResponse} from "./ServerResponse";

export class Response {
    resultType: boolean = false;
    errorMessage?: string[] = [];
    serverResponse?: ServerTreeResponse|ServerChartResponse;
}