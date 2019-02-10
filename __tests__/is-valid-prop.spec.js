import chai from 'chai'
import mocha from 'mocha'
import { isPropValid } from '../src/lib/index.js'

const expect = chai.expect

describe('Is valid prop test', () => {
  it('Should allow valid props', () => {
    const props = [
      'children',
      'htmlFor',
      'for',
      'class',
      'className',
      'onClick',
      'onAnything',
      'data-something'
    ]
    expect(props.every(isPropValid)).to.equal(true)
  })

  it('Should disallow invalid props', () => {
    const props = ['not-valid', 'testtest', 'asdasd']
    expect(props.every(prop => !isPropValid(prop))).to.equal(true)
  })
})
