import chai from 'chai'
import mocha from 'mocha'
import { getClassName } from '../src/lib/index.js'

const expect = chai.expect

describe('Is valid prop test', () => {
  it('Should handle class', () => {
    const res = getClassName({}, 'some-class')
    expect(res).to.equal('some-class')
  })

  it('Should handle no class', () => {
    const res = getClassName({}, '')
    expect(res).to.equal('')
  })

  it('Should handle just props class', () => {
    const res = getClassName({ className: 'some-class' }, '')
    expect(res).to.equal('some-class')
  })

  it('Should concatenate', () => {
    const res = getClassName({ className: 'component-class' }, 'class')
    expect(res).to.equal('class component-class')
  })

  it('Should handle class property (preact)', () => {
    const res = getClassName({ class: 'component-class' }, 'class')
    expect(res).to.equal('class component-class')
  })
})
