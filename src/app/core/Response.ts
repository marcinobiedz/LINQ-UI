import {ServerResponse} from "./ServerResponse";

export class Response {
    resultType: boolean = false;
    errorMessage?: string[] = [];
    serverResponse?: ServerResponse;
}