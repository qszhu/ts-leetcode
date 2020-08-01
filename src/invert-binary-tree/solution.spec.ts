import * as chai from 'chai'

import invertTree from './solution'
import { processTree } from '../test-util'

const assert = chai.assert

describe('solution', async () => {
  it('should pass edge tests', async () => {
    assert.deepEqual(processTree(invertTree, []), [])
    assert.deepEqual(processTree(invertTree, [1]), [1])
  })
  it('should pass tests', async () => {
    assert.deepEqual(processTree(invertTree, [4, 2, 7, 1, 3, 6, 9]), [4, 7, 2, 9, 6, 3, 1])
  })
})
