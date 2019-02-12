import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import { styled } from 'classnames-in-js'
import cx from 'classnames'
import styles from './index.module.css'

const Heading = styled('h1', styles.heading)
const HeadingLink = styled(Link, props =>
  cx({ [styles.heading__link]: true, [styles.heading__linkDark]: props.dark })
)

const Header = ({ siteTitle }) => (
  <header>
    <div>
      <Heading>
        <HeadingLink dark to="/">
          {siteTitle}
        </HeadingLink>
      </Heading>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header
