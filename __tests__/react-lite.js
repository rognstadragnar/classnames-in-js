import { styled } from '../src/react-lite'
import React from 'react'
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from 'react-testing-library'
import cx from 'classnames'

afterEach(cleanup)

describe('React function API', () => {
  it('Should set className', async () => {
    const Container = styled('div', 'container')
    const { getByTestId } = render(
      <Container data-testid="el">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
      </Container>
    )

    const el = await waitForElement(() => getByTestId('el'))

    expect(el.classList.contains('container')).toEqual(true)
    expect(el.childElementCount).toEqual(2)
  })

  it('Should preppend className', async () => {
    const Heading = styled('h1', 'heading')
    const { getByTestId } = render(
      <Heading className="some-other" data-testid="el">
        el
      </Heading>
    )

    const el = await waitForElement(() => getByTestId('el'))
    expect(el.classList.contains('heading')).toEqual(true)
    expect(el.classList.contains('some-other')).toEqual(true)
  })

  it('Should react to props className', async () => {
    const Heading = styled(
      'h1',
      props => cx('heading', props.small && 'heading--small'),
      ['small']
    )
    const { getByTestId } = render(
      <>
        <Heading data-testid="normal">normal</Heading>
        <Heading data-testid="small" small>
          small
        </Heading>
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
    const Heading = styled('h1', 'heading')
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
    const Heading = styled('h1', 'heading', ['test'])
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
