export class MenuPanel {
    private menuList: HTMLUListElement;
    private menuOptions: string[];
    private menuIcons: string[];

    constructor(private menuPanel: HTMLDivElement) {
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
        return '<span class="glyphicon ' + icon + '\" aria-hidden=\"true\"></span> ' + option;
    }

    private changeMenuItem(event: MouseEvent): void {
        const activeItem = Array.from(this.menuList.children).filter(child=>child.classList.contains("active"));
        activeItem ? activeItem.forEach(item=>item.classList.remove("active")) : null;
        (<HTMLLIElement>event.target).classList.add("active");
    }
}