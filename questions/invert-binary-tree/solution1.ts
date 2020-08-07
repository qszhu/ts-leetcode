// recursive
const invertTree = (root: TreeNode): TreeNode => {
  if (root === null) return root
  ;[root.left, root.right] = [invertTree(root.right), invertTree(root.left)]
  return root
}

/******************************************************************************/

interface TreeNode {
  val: number
  left: TreeNode
  right: TreeNode
}
