import {Panel, Updatable, Launcher} from "../core/Panel";
import {Response} from "../core/Response";

export class MenuPanel extends Panel implements Updatable {
    private menuList: HTMLUListElement;

    constructor(menuPanel: HTMLDivElement, private launchers: Launcher[]) {
        super(menuPanel);
        this.menuList = document.createElement("ul");
        this.mainPanel.appendChild(this.menuList);
        this.setMenuList(this.menuList);
    }

    private setMenuList(menuList: HTMLUListElement): void {
        menuList.classList.add("list-group");
        this.createMenuItems(menuList, this.launchers);
    }

    private createMenuItems(menuList: HTMLUListElement, launchers: Launcher[]): void {
        launchers.forEach((launcher, index) => {
            const menuItem: HTMLLIElement = document.createElement("li");
            menuItem.classList.add("list-group-item");
            menuItem.innerHTML = this.createMenuItem(launcher);
            menuList.appendChild(menuItem);
            menuItem.addEventListener("click", this.changeMenuItem.bind(this));
            menuItem.addEventListener("click", launcher.launcher);
        });
        this.markItem(0);
    }

    private createMenuItem(launcher: Launcher): string {
        if (launcher.hasIcon) {
            return '<span class="glyphicon ' + launcher.iconName + '" aria-hidden=\"true\"></span> ' + launcher.label;
        } else {
            return '<span aria-hidden=\"true\"></span> ' + launcher.label;
        }
    }

    private changeMenuItem(event: MouseEvent): void {
        Array.from(this.menuList.children).forEach(child => child.classList.remove("active"));
        (<HTMLLIElement>event.target).classList.add("active");
    }

    markItem(item: number): void {
        Array.from(this.menuList.children).forEach(child => child.classList.remove("active"));
        this.menuList.children[item].classList.add("active");
    }

    update(response: Response, expression: string): void {
    }
}