# WIP: Yttug

For when you love the idea of `styled-components`, but you also hate the idea of `styled-components`

A `~2kb` library for working with CSS in React (or Preact) applications. Heavily inspired by how `styled-components` and `emotion` lets us write components, but without having to write CSS-in-JS.

## usage

#### Installation

```sh
# soon
npm i yttug
```

#### Basic usage

```js
import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'yttug'

const Heading = styled('h1', 'heading-class')

ReactDOM.render(<Heading>Hello</Heading>, document.body)

// <h1 class="heading-class">Hello</h1>
```

#### Yttug loves CSS modules

```js
import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'yttug'
import styles from './styles.css'

const Heading = styled('h1', styles.heading)

ReactDOM.render(<Heading>Hello</Heading>, document.body)

// <h1 class="heading-lkjfos">Hello</h1>
```

#### Yttug loves conditionally applying classes

```js
import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'yttug'
import cx from 'classnames'

import styles from './styles.css'

const Heading = styled('h1', props =>
  cx({
    [styles.heading]: true,
    [styles.headingActive]: props.active
  })
)

ReactDOM.render(<Heading active>Hello</Heading>, document.body)

// <h1 class="heading-lkjfos heading--active-lkjfos">Hello</h1>
```

#### Easily append classes

```js
import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'yttug'

const Heading = styled('h1', 'heading-class')

ReactDOM.render(
  <Heading className="some-other-class">Hello</Heading>,
  document.body
)

// <h1 class="heading-class some-other-class">Hello</h1>
```

#### Yttug loves Preact

```js
import styled from 'yttug/preact'
```

## Todo/RFC

```js
import React from 'react'
import ReactDOM from 'react-dom'
import styled, { ThemeProvider } from 'yttug'

const Heading = styled('h1', (props, theme) => `heading heading--${theme}`)

const theme = 'sport'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Heading className="some-other-class">Hello</Heading>
  </ThemeProvider>,
  document.body
)

// <h1 class="heading heading--sport">Hello</h1>
```

## License

[MIT](LICENSE).
