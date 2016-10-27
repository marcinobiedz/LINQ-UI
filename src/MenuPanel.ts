export class MenuPanel {
    private menuList: HTMLUListElement;
    private menuOptions: string[];
    private menuIcons: Array<[string,string]>;

    constructor(private menuPanel: HTMLDivElement) {
        this.menuList = document.createElement("ul");
        this.menuOptions = ["Tree visualization"];

        this.menuPanel.appendChild(this.menuList);
        this.setMenuList(this.menuList);
    }

    private setMenuList(menuList: HTMLUListElement): void {
        menuList.classList.add("nav", "navbar-nav", "side-nav");
        this.createMenuItems(menuList, this.menuOptions, this.menuIcons);
    }

    private createMenuItems(menuList: HTMLUListElement, menuOptions: string[], menuIcons: Array<[string,string]>): void {
        menuOptions.forEach((menuOption: string, index: number) => {
            const menuItem: HTMLLIElement = document.createElement("li");
            menuItem.innerHTML = menuOption;
            menuItem.style.width = "100%";
            menuList.appendChild(menuItem);
        });
    }
}