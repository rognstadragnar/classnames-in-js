# WIP: codename yttug

For when you love the idea of `styled-components`, but you also hate the idea of `styled-components`

A `~2kb` library for working with CSS in React (or Preact) applications. Heavily inspired by how `styled-components` and `emotion` lets us write components, but without having to write CSS-in-JS.

## usage

```sh
# soon
npm i yttug
```

```js
import React from 'react'
import ReactDOM from 'react-react'
import yttug from 'yttug'

const Heading = yttug('h1', 'heading-class')

ReactDOM.render(<Heading>Hello</Heading>, document.body)

// <h1 class="heading-class">Hello</h1>
```

#### Yttug loves CSS modules

```js
import React from 'react'
import ReactDOM from 'react-react'
import yttug from 'yttug'
import styles from './styles.css'

const Heading = yttug('h1', styles.heading)

ReactDOM.render(<Heading>Hello</Heading>, document.body)

// <h1 class="heading-lkjfos">Hello</h1>
```

#### Yttug loves conditionally applying classes

```js
import React from 'react'
import ReactDOM from 'react-react'
import yttug from 'yttug'
import cx from 'classnames'

import styles from './styles.css'

const Heading = yttug('h1', props =>
  cx({
    [styles.heading]: true,
    [styles.headingActive]: props.active
  })
)

ReactDOM.render(<Heading active>Hello</Heading>, document.body)

// <h1 class="heading-lkjfos heading--active-lkjfos">Hello</h1>
```

```js
import React from 'react'
import ReactDOM from 'react-react'
import yttug from 'yttug'
import cx from 'classnames'

import styles from './styles.css'

const Heading = yttug('h1', 'heading-class')

ReactDOM.render(
  <Heading className="some-other-class">Hello</Heading>,
  document.body
)

// <h1 class="heading-class some-other-class">Hello</h1>
```

## License

[MIT](LICENSE).
