///<reference types="../../typings" />

type ListNode = IListNode<number>

const swapPairs = (head: ListNode): ListNode => {
  if (!head || !head.next) return head

  const [p, q] = [head, head.next]
  const next = swapPairs(q.next)
  ;[p.next, q.next] = [next, p]
  return q
}

export default swapPairs
