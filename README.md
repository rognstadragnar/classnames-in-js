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

#### Integrates with CSS modules

```js
import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'yttug'
import styles from './styles.css'

const Heading = styled('h1', styles.heading)

ReactDOM.render(<Heading>Hello</Heading>, document.body)

// <h1 class="heading-lkjfos">Hello</h1>
```

#### Conditionally applying classes

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

#### Appending and overriding

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

#### Theming

```js
import React from 'react'
import ReactDOM from 'react-dom'
import styled, { Theme } from 'yttug'

const Heading = styled('h1', (props, theme) => `heading heading--${theme}`)

ReactDOM.render(
  <Theme.Provider value={'sport'}>
    <Heading>Hello</Heading>
  </Theme.Provider>,
  document.body
)

// <h1 class="heading heading--sport">Hello</h1>
```

#### Preact

```js
import styled from 'yttug/preact'
```

Note: `yttug/preact` does not currently support automaticly extracting theming from context. This is on the todo list.

## License

[MIT](LICENSE).
