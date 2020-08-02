export class ListNode<T> {
  static fromArray<T>(arr: T[]): ListNode<T> {
    const [first, ...rest] = arr
    if (!first) return null

    const res = new ListNode<T>(first)
    res.next = ListNode.fromArray<T>(rest)
    return res
  }

  static toArray<T>(head: ListNode<T>): T[] {
    if (head === null) return []

    return [head.val].concat(ListNode.toArray<T>(head.next))
  }

  constructor(public val: T, public next: ListNode<T> = null) {}
}

export function processList<T>(func: (head: ListNode<T>) => ListNode<T>, arr: T[]): T[] {
  return ListNode.toArray<T>(func(ListNode.fromArray<T>(arr)))
}

export class TreeNode<T> {
  static toArray<T>(root: TreeNode<T>): T[] {
    if (root === null) return []

    const queue: TreeNode<T>[] = [root]
    const res: T[] = []

    while (queue.length > 0) {
      const node = queue.shift()
      if (node === null) {
        res.push(null)
        continue
      }
      res.push(node.val)

      queue.push(node.left)
      queue.push(node.right)
    }

    while (res[res.length - 1] === null) {
      res.pop()
    }
    return res
  }

  static fromArray<T>(arr: T[]): TreeNode<T> {
    if (!arr || arr.length === 0) return null

    let level: TreeNode<T>[] = [new TreeNode<T>(arr[0])]
    const root = level[0]

    let i = 1
    while (i < arr.length && level.length !== 0) {
      const next: TreeNode<T>[] = []
      for (const node of level) {
        if (!node) continue
        node.left = arr[i] ? new TreeNode<T>(arr[i]) : null
        i++
        next.push(node.left)

        node.right = arr[i] ? new TreeNode<T>(arr[i]) : null
        i++
        next.push(node.right)
      }
      while (!next[next.length - 1]) next.pop()
      level = next
    }
    return root
  }

  constructor(public val: T, public left: TreeNode<T> = null, public right: TreeNode<T> = null) {}
}

export function processTree<T>(func: (root: TreeNode<T>) => TreeNode<T>, arr: T[]): T[] {
  return TreeNode.toArray<T>(func(TreeNode.fromArray<T>(arr)))
}

export class NTreeNode<T> {
  static fromArray<T>(arr: T[]): NTreeNode<T> {
    if (!arr || arr.length === 0) return null

    let i = 0

    const nextNodes = () => {
      const res = []
      for (; i < arr.length && arr[i] !== null; i++) {
        res.push(new NTreeNode<T>(arr[i]))
      }
      i++
      return res
    }

    let level: NTreeNode<T>[] = nextNodes()
    const root = level[0]
    while (level.length !== 0) {
      let nextLevel: NTreeNode<T>[] = []
      for (const node of level) {
        node.children = nextNodes()
        nextLevel = nextLevel.concat(node.children)
      }
      level = nextLevel
    }

    return root
  }

  constructor(public val: T, public children: NTreeNode<T>[] = []) {}
}
