# WIP: Codename fasong

When you love the idea of `styled-components` and `CSS-in-JS`, but you also hate the idea of `styled-components` and `CSS-in-JS`.

A library for working with CSS in React (or Preact) applications. Heavily inspired by how `styled-components` and `emotion` lets us write components, but without having to write CSS-in-JS.

## Usage

#### Installation

```sh
# soon
npm i fasong
```

#### Basic usage

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { styled } from 'fasong'

const Heading = styled('h1', 'heading')

ReactDOM.render(<Heading>Hello</Heading>, document.body)

// <h1 class="heading">Hello</h1>
```

#### Integrates with CSS modules

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { styled } from 'fasong'
import styles from './styles.css'

const Heading = styled('h1', styles.heading)

ReactDOM.render(<Heading>Hello</Heading>, document.body)

// <h1 class="heading-lkjfos">Hello</h1>
```

#### Conditionally applying classes

If `fasong` recieves a function as the second argument it will be called with the component props and/or [theme](#Theming).

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { styled } from 'fasong'
import cx from 'classnames'

import styles from './styles.css'

const Heading = styled('h1', props =>
  cx({
    [styles.heading]: true,
    [styles.headingDark]: props.dark
  })
)

ReactDOM.render(<Heading dark>Hello</Heading>, document.body)

// <h1 class="heading-lkjfos heading--dark-lkjfos">Hello</h1>
```

#### Appending and overriding

If a consumer passes a `className` prop it will be appended.

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { styled } from 'fasong'

const Heading = styled('h1', 'heading')

ReactDOM.render(
  <Heading className="heading--dark">Hello</Heading>,
  document.body
)

// <h1 class="heading heading--dark">Hello</h1>
```

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { styled } from 'fasong'

const Heading = styled('h1', 'heading')
const DarkHeading = styled(Heading, 'heading--dark')
const EvenDarkerHeading = styled(DarkHeading, 'heading--even-darker')

ReactDOM.render(
  <>
    <Heading>Hello</Heading>
    <DarkHeading>Hello</DarkHeading>
    <EvenDarkerHeading>Hello</EvenDarkerHeading>
  </>,
  document.body
)

// <h1 class="heading">Hello</h1>
// <h1 class="heading heading--dark">Hello</h1>
// <h1 class="heading heading--dark heading--even-darker">Hello</h1>
```

#### Theming

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { styled, Theme } from 'fasong'

const Heading = styled('h1', (props, theme) => `heading heading--${theme}`)

ReactDOM.render(
  <Theme.Provider value={'sport'}>
    <Heading>Hello</Heading>
  </Theme.Provider>,
  document.body
)

// <h1 class="heading heading--sport">Hello</h1>
```

#### Tagged template literal API

`fasong` also supports using tagged template literals to construct classes.

If a interpolated value is a function it will be called with the components `props` and the `theme` context if present.

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { styled, Theme } from 'fasong'

const Heading = styled.h1`
  heading
  ${Date.now() === 42 ? 'heading--dark' : ''}
  ${(props, theme) => `heading--${theme}`}
`

ReactDOM.render(
  <Theme.Provider value={'sport'}>
    <Heading>Hello</Heading>
  </Theme.Provider>,
  document.body
)

// <h1 class="heading heading--dark heading--sport">Hello</h1>
```

#### Preact

```js
import styled from 'fasong/preact'
```

**Note**: `fasong/preact` does not currently support automaticly extracting theming from context or the tagged template literal api. This is on the todo list.

## License

[MIT](LICENSE).
