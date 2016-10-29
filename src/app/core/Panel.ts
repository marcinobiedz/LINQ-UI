import {Response} from "./Response";
export abstract class Panel {
    public abstract update(response: Response): void;
}