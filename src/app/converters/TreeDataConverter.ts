import {ResponseTreeNode} from "../core/ServerResponse";
import {TreeNode} from "../renderers/TreeNode";

export class TreeDataConverter {
    private parentNode: TreeNode;

    convert(tree: ResponseTreeNode[]): TreeNode {
        this.parentNode = new TreeNode();
        const parentServerNode: ResponseTreeNode = tree.filter(node => {
            return node.ParentId == null;
        })[0];
        this.parentNode.name = parentServerNode.Text;
        this.parentNode.nodeText = parentServerNode.NodeText ? parentServerNode.NodeText : "";
        this.createNodes(tree, parentServerNode.Id, this.parentNode);
        return this.parentNode;
    }

    private createNodes(tree: ResponseTreeNode[], parentId: number, parentNode: TreeNode): void {
        const filteredNodes: ResponseTreeNode[] = tree.filter(node => node.ParentId == parentId);
        filteredNodes.length > 0 ? parentNode.children = [] : null;
        filteredNodes.forEach(node => {
            const childNode: TreeNode = new TreeNode();
            childNode.name = node.Text;
            childNode.nodeText = node.NodeText ? node.NodeText : "";
            parentNode.children.push(childNode);
            this.createNodes(tree, node.Id, childNode);
        })
    }
}