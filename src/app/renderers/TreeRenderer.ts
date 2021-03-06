import * as d3 from 'd3'
import {Margins, TreeSize} from "./Measures";
import {TreeNode} from "./TreeNode";

export class TreeRenderer {
    private tooltipElement: HTMLSpanElement;
    private svgClientRect: ClientRect;
    private margins: Margins;
    private treeSize: TreeSize;
    private i: number = 0;
    private duration: number = 750;
    //=======================
    private root: TreeNode;
    private tree;
    private diagonal;
    private svg;

    constructor(private canvas: SVGSVGElement) {
        this.tooltipElement = <HTMLSpanElement>document.querySelector("span#linq-ui-tooltip");
        this.svgClientRect = canvas.getBoundingClientRect();
        this.margins = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        };
        this.treeSize = {
            width: this.svgClientRect.width - this.margins.right - this.margins.left,
            height: this.svgClientRect.height - this.margins.top - this.margins.bottom
        };
        this.tree = d3.layout.tree().size([this.treeSize.height, this.treeSize.width]);

        //noinspection TypeScriptUnresolvedFunction // TODO: poprawić
        this.diagonal = d3.svg.diagonal().projection(d => {
            return [d.y, d.x];
        });
    }

    render(convertedData: TreeNode): void {
        this.root = convertedData;
        this.svg = d3.select("svg").append("g")
            .attr("transform", "translate(" + this.margins.left + "," + this.margins.top + ")");

        convertedData.x0 = (this.treeSize.height / 2);
        convertedData.y0 = 0;

        this.update(convertedData);
    }

    private update(source: TreeNode): void {
        const nodes = this.tree.nodes(this.root).reverse();
        const links = this.tree.links(nodes);
        // Normalize for fixed-depth.
        nodes.forEach(d => {
            d.y = d.depth * 160;
        });
        // Update the nodes…
        const node = this.svg.selectAll("g.node")
            .data(nodes, d => {
                return d.id || (d.id = ++this.i);
            });
        const nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", d => {
                return "translate(" + source.y0 + "," + source.x0 + ")";
            })
            .on("click", this.clickNode.bind(this))
            .on("mousemove", this.showTooltip.bind(this))
            .on("mouseleave", this.hideTooltip.bind(this));

        nodeEnter.append("circle")
            .attr("r", 1e-6)
            .style("fill", d => {
                return d._children ? "lightsteelblue" : "#fff";
            });

        nodeEnter.append("text")
            .attr("x", d => {
                return -10;
            })
            .attr("y", d => {
                return 21;
            })
            .attr("dy", ".35em")
            .attr("text-anchor", d => {
                return "start";
            })
            .text(d => {
                return d.nodeText;
            })
            .style("fill-opacity", 1e-6);

        const nodeUpdate = node.transition()
            .duration(this.duration)
            .attr("transform", d => {
                return "translate(" + d.y + "," + d.x + ")";
            });

        nodeUpdate.select("circle")
            .attr("r", 10)
            .style("fill", d => {
                return d._children ? "lightsteelblue" : "#fff";
            });

        nodeUpdate.select("text")
            .style("fill-opacity", 1)
            .text(d => {
                if (d._children) {
                    return this.rollLabel(d);
                }
                else
                    return d.nodeText;
            });

        const nodeExit = node.exit().transition()
            .duration(this.duration)
            .attr("transform", d => {
                return "translate(" + source.y + "," + source.x + ")";
            })
            .remove();

        nodeExit.select("circle")
            .attr("r", 1e-6);

        nodeExit.select("text")
            .style("fill-opacity", 1e-6);

        // Update the links…
        const link = this.svg.selectAll("path.link")
            .data(links, d => {
                return d.target.id;
            });

        // Enter any new links at the parent's previous position.
        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", d => {
                const o = {x: source.x0, y: source.y0};
                return this.diagonal({source: o, target: o});
            });

        // Transition links to their new position.
        link.transition()
            .duration(this.duration)
            .attr("d", this.diagonal);

        link.exit().transition()
            .duration(this.duration)
            .attr("d", d => {
                const o = {x: source.x, y: source.y};
                return this.diagonal({source: o, target: o});
            })
            .remove();

        // Stash the old positions for transition.
        nodes.forEach(d => {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    private rollLabel(d): string {
        const children = d.children || d._children || [];
        if (children.length > 1) {
            const nextChildren = children.filter((child, index) => index > 0);
            return this.rollLabel(children[0]) + "." + d.nodeText +
                "(" + nextChildren.map(child => this.rollLabel(child)).join(",") + ")";
        } else if (children.length == 1 && d.name.startsWith("MemberExpression")) {
            return this.rollLabel(children[0]) + "." + d.nodeText;
        } else if (children.length == 1 && !d.nodeText) {
            return this.rollLabel(children[0]);
        } else if (children.length == 1) {
            return d.nodeText + "(" + this.rollLabel(children[0]) + ")";
        } else
            return d.nodeText;
    }

    private clickNode(d): void {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        this.update(d);
    }

    private showTooltip(d) {
        this.tooltipElement.innerHTML = d.name;
        const event = <MouseEvent>d3.event;
        this.tooltipElement.style.top = (event.clientY - 40) + "px";
        this.tooltipElement.style.left = event.clientX + "px";
        this.tooltipElement.style.visibility = "visible";
    }

    private hideTooltip() {
        this.tooltipElement.style.visibility = "hidden";
        this.tooltipElement.innerHTML = "";
    }
}