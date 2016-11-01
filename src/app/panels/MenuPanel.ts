import {Panel} from "../core/Panel";
import {Response} from "../core/Response";

export class MenuPanel extends Panel {
    private menuList: HTMLUListElement;
    private menuOptions: string[];
    private menuIcons: string[];
    private previousQueries: string[] = [];

    constructor(private menuPanel: HTMLDivElement) {
        super();
        this.menuList = document.createElement("ul");
        this.menuOptions = ["Tree visualization", "History"];
        this.menuIcons = ["glyphicon-tree-conifer", "glyphicon-book"];

        this.menuPanel.appendChild(this.menuList);
        this.setMenuList(this.menuList);
    }

    private setMenuList(menuList: HTMLUListElement): void {
        menuList.classList.add("list-group");
        this.createMenuItems(menuList, this.menuOptions, this.menuIcons);
    }

    private createMenuItems(menuList: HTMLUListElement, menuOptions: string[], menuIcons: string[]): void {
        menuOptions.forEach((menuOption: string, index: number) => {
            const menuItem: HTMLLIElement = document.createElement("li");
            menuItem.classList.add("list-group-item");
            menuItem.innerHTML = this.createMenuItem(menuIcons[index], menuOption);
            menuList.appendChild(menuItem);
            menuItem.addEventListener("click", this.changeMenuItem.bind(this));
        });
    }

    private createMenuItem(icon: string, option: string): string {
        const item: string = '<span class="glyphicon ' + icon + '\" aria-hidden=\"true\"></span> ' + option;
        return option == "History" ? item + ' <span class="badge">0</span>' : item;
    }

    private changeMenuItem(event: MouseEvent): void {
        const activeItem = Array.from(this.menuList.children).filter(child=>child.classList.contains("active"));
        activeItem ? activeItem.forEach(item=>item.classList.remove("active")) : null;
        (<HTMLLIElement>event.target).classList.add("active");
    }

    update(response: Response, expression: string): void {
        if (response.resultType) {
            if (this.previousQueries.indexOf(expression) < 0) {
                this.previousQueries.push(expression);
                this.menuList.querySelector("span.badge").innerHTML = this.previousQueries.length.toString();
            }
        }
    }
}