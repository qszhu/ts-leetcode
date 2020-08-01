interface IListNode<T> {
  val: T
  next: IListNode<T>
}

interface IBinaryTreeNode<T> {
  val: T
  left: IBinaryTreeNode<T>
  right: IBinaryTreeNode<T>
}

interface INaryTreeNode<T> {
  val: T
  children: INaryTreeNode<T>[]
}
