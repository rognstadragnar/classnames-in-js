<p align="center" style="color: #343a40">
  <h1 align="center">classnames-in-js</h1>
</p>

### A more sane approach to CSS in React (and Preact)

When you love the idea of `styled-components` and `CSS-in-JS`, but you also kind of hate it.

Heavily inspired by how [styled-components](https://www.styled-components.com/) and [emotion](https://emotion.sh/) lets us write components, but without having to write CSS in JavaScript.

## Usage

#### Installation

```sh
npm i classnames-in-js
```

#### Basic usage

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { styled } from 'classnames-in-js'

const Heading = styled('h1', 'heading')

ReactDOM.render(<Heading>Hello</Heading>, document.body)

// <h1 class="heading">Hello</h1>
```

#### Integrates with CSS modules

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { styled } from 'classnames-in-js'
import styles from './styles.css'

const Heading = styled('h1', styles.heading)

ReactDOM.render(<Heading>Hello</Heading>, document.body)

// <h1 class="heading-lkjfos">Hello</h1>
```

#### Conditionally applying classes

If `classnames-in-js` recieves a function as the second argument it will be called with the component props and/or [theme](#Theming).

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { styled } from 'classnames-in-js'
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
import { styled } from 'classnames-in-js'

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
import { styled } from 'classnames-in-js'

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
import { styled, Theme } from 'classnames-in-js'

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

`classnames-in-js` also supports using tagged template literals to construct classes.

If an interpolated value is a function it will be called with the `props` and the `theme` if present.

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { styled, Theme } from 'classnames-in-js'

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
import styled from 'classnames-in-js/preact'
```

**Note**: `classnames-in-js/preact` does not currently support automaticly extracting theming from context or the tagged template literal api. This is on the todo list.

## License

[MIT](LICENSE).
