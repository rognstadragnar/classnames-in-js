import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import { styled, Theme } from 'classnames-in-js'
import classnames from 'classnames'
import SEO from '../components/seo'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import './styles.css'
import 'prism-theme-night-owl'

const code = `const Container = styled('div', 'container')
const Heading = styled('h1', props => cx('heading', props.blue && 'heading--blue'))
const Input = styled('input', props => cx('input', props.type === 'password' && 'input--password'))
const Button = styled.button\`
  bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded
\`
render(
  <Container>
    <Heading blue>Hello World!</Heading>
    <Input />
    <Input type="password" />
    <Button>Submit<Button />
  </Container>
)
`

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div>
      <LiveProvider
        noInline
        code={code}
        scope={{ styled, Theme, classnames, cx: classnames }}
      >
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
