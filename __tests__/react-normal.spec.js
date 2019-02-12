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

afterEach(cleanup)

describe('React function API', () => {
  it('Should set className', async () => {
    const Heading = styled('h1', 'heading')
    const { getByTestId } = render(<Heading data-testid="el" />)

    const el = await waitForElement(() => getByTestId('el'))
    expect(el.classList.contains('heading')).toEqual(true)
  })

  it('Should preppend className', async () => {
    const Heading = styled('h1', 'heading')
    const { getByTestId } = render(
      <Heading className="some-other" data-testid="el" />
    )

    const el = await waitForElement(() => getByTestId('el'))
    expect(el.classList.contains('heading')).toEqual(true)
    expect(el.classList.contains('some-other')).toEqual(true)
  })

  it('Should react to props className', async () => {
    const Heading = styled('h1', props =>
      cx('heading', props.small && 'heading--small')
    )
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
})
