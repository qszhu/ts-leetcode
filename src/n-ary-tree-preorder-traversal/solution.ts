///<reference types="../../typings" />

type Node = INaryTreeNode<number>

const traversePreorder = (node: Node, cb: (node: Node) => void) => {
  if (node === null) return
  cb(node)
  for (const child of node.children) {
    traversePreorder(child, cb)
  }
}

const preorder = (root: Node): number[] => {
  const res: number[] = []
  traversePreorder(root, (node) => res.push(node.val))
  return res
}

export default preorder
