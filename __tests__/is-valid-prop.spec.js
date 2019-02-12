import { isPropValid } from '../src/lib/index.js'

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
    expect(props.every(isPropValid)).toEqual(true)
  })

  it('Should disallow invalid props', () => {
    const props = ['not-valid', 'testtest', 'asdasd']
    expect(props.every(prop => !isPropValid(prop))).toEqual(true)
  })
})
