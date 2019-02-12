import { styled, Theme } from '../src/react'
import React from 'react'
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from 'react-testing-library'
import cx from 'classnames'
// import './setup'
import { isPropValid } from '../src/lib/index.js'

afterEach(cleanup)

describe('React tag API', async () => {
  it('Should set className', () => {
    const Heading = styled.h1`heading`
    const { getByTestId } = render(<Heading data-testid="el" />)

    const el = getByTestId('el')
    expect(el.classList.contains('heading')).toEqual(true)
  })

  it('Should preppend className', async () => {
    const Heading = styled.h1`heading`
    const { getByTestId } = render(
      <Heading className="some-other" data-testid="el" />
    )

    const el = await waitForElement(() => getByTestId('el'))

    expect(el.classList.contains('heading')).toEqual(true)
    expect(el.classList.contains('some-other')).toEqual(true)
  })

  it('Should react to props className', async () => {
    const Heading = styled.h1`
      heading
      ${props => cx(props.small && 'heading--small')}
    `

    const { getByTestId } = render(
      <>
        <Heading data-testid="normal" />
        <Heading data-testid="small" small />
      </>
    )

    const normalEl = await waitForElement(() => getByTestId('normal'))
    const smallEl = await waitForElement(() => getByTestId('small'))

    expect(normalEl.classList.contains('heading')).toEqual(true)
    expect(normalEl.classList.contains('heading--small')).toEqual(false)

    expect(smallEl.classList.contains('heading')).toEqual(true)
    expect(smallEl.classList.contains('heading--small')).toEqual(true)
  })

  it('Should be able to extend already styled components', async () => {
    const Heading = styled.h1`heading`
    const SmallHeading = styled(Heading, 'heading--small')

    const { getByTestId } = render(
      <>
        <Heading data-testid="normal" />
        <SmallHeading data-testid="small" />
      </>
    )

    const normalEl = await waitForElement(() => getByTestId('normal'))
    const smallEl = await waitForElement(() => getByTestId('small'))

    expect(normalEl.classList.contains('heading')).toEqual(true)
    expect(normalEl.classList.contains('heading--small')).toEqual(false)

    expect(smallEl.classList.contains('heading')).toEqual(true)
    expect(smallEl.classList.contains('heading--small')).toEqual(true)
  })

  it('Should handle valid and invalid props to HTMLElement', async () => {
    const Heading = styled.h1`heading`
    const invalidElMockFn = jest.fn()
    const validElMockFn = jest.fn()

    const { getByTestId } = render(
      <>
        <Heading data-testid="invalid-props" test onClick={invalidElMockFn} />
        <Heading data-testid="valid-props" data-test onClick={validElMockFn} />
      </>
    )

    const invalidEl = await waitForElement(() => getByTestId('invalid-props'))
    const invalidValue = invalidEl.getAttribute('test')
    const validEl = await waitForElement(() => getByTestId('valid-props'))
    const validValue = validEl.getAttribute('data-test')

    await fireEvent.click(invalidEl)
    await fireEvent.click(validEl)

    expect(invalidElMockFn).toBeCalledTimes(1)
    expect(validElMockFn).toBeCalledTimes(1)

    expect(invalidEl.classList.contains('heading')).toEqual(true)
    expect(invalidValue).toEqual(null)

    expect(validEl.classList.contains('heading')).toEqual(true)

    expect(validValue).toEqual('true')
  })
})
