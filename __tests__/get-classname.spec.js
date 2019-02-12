import { getClassName } from '../src/lib/index.js'

describe('Is valid prop test', () => {
  it('Should handle class', () => {
    const res = getClassName({}, 'a-class')
    expect(res).toEqual('a-class')
  })

  it('Should handle no class', () => {
    const res = getClassName({}, '')
    expect(res).toEqual('')
  })

  it('Should handle just props class', () => {
    const res = getClassName({ className: 'some-class' }, '')
    expect(res).toEqual('some-class')
  })

  it('Should concatenate', () => {
    const res = getClassName({ className: 'component-class' }, 'class')
    expect(res).toEqual('class component-class')
  })

  it('Should handle class property (preact)', () => {
    const res = getClassName({ class: 'component-class' }, 'class')
    expect(res).toEqual('class component-class')
  })
})
