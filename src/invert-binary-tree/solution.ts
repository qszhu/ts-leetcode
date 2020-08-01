///<reference types="../../typings" />

type TreeNode = IBinaryTreeNode<number>

const invertTree = (root: TreeNode): TreeNode => {
  if (root === null) return root
  ;[root.left, root.right] = [invertTree(root.right), invertTree(root.left)]
  return root
}

export default invertTree
