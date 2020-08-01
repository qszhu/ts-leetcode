import * as chai from 'chai'

import preorder from './solution'
import { NTreeNode } from '../test-util'

const assert = chai.assert

describe('solution', async () => {
  it('should pass edge tests', async () => {
    assert.deepEqual(preorder(NTreeNode.fromArray<number>([])), [])
    assert.deepEqual(
      preorder(
        NTreeNode.fromArray<number>([1])
      ),
      [1]
    )
  })
  it('should pass tests', async () => {
    assert.deepEqual(
      preorder(
        NTreeNode.fromArray<number>([1, null, 3, 2, 4, null, 5, 6])
      ),
      [1, 3, 5, 6, 2, 4]
    )
    assert.deepEqual(
      preorder(
        NTreeNode.fromArray<number>([
          1,
          null,
          2,
          3,
          4,
          5,
          null,
          null,
          6,
          7,
          null,
          8,
          null,
          9,
          10,
          null,
          null,
          11,
          null,
          12,
          null,
          13,
          null,
          null,
          14,
        ])
      ),
      [1, 2, 3, 6, 7, 11, 14, 4, 8, 12, 5, 9, 13, 10]
    )
  })
})
