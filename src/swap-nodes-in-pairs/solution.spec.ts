import * as chai from 'chai'

import swapPairs from './solution'
import { processList } from '../test-util'

const assert = chai.assert

describe('solution', async () => {
  it('should pass edge tests', async () => {
    assert.deepEqual(processList(swapPairs, []), [])
    assert.deepEqual(processList(swapPairs, [1]), [1])
  })
  it('should pass tests', async () => {
    assert.deepEqual(processList(swapPairs, [1, 2]), [2, 1])
    assert.deepEqual(processList(swapPairs, [1, 2, 3]), [2, 1, 3])
    assert.deepEqual(processList(swapPairs, [1, 2, 3, 4]), [2, 1, 4, 3])
  })
})
