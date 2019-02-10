import React from 'react'
import { getClassName, isPropValid } from './lib/index'
import { Theme } from './theme'

export default function styled(tag, styledClassName) {
  const render = createRender(tag, styledClassName)
  return React.forwardRef
    ? React.forwardRef(render)
    : // React.forwardRef won't available on older React versions and in Preact
      // Fallback to a innerRef prop in that case
      ({ innerRef, ...rest }) => render(rest, innerRef)
}

function createRender(tag, styledClassName) {
  function render(props, ref) {
    const { as: component = tag, ...rest } = props
    let filteredProps

    // Check if it's an HTML tag and not a custom element
    if (typeof tag === 'string' && !tag.includes('-')) {
      filteredProps = {}

      // eslint-disable-next-line guard-for-in
      for (const key in rest) {
        if (key === 'as' || isPropValid(key)) {
          // Don't pass through invalid attributes to HTML elements
          filteredProps[key] = rest[key]
        }
      }
    } else {
      filteredProps = rest
    }

    filteredProps.ref = ref
    return React.createElement(Theme.Consumer, {
      children: theme => {
        filteredProps.className = getClassName(props, styledClassName, theme)
        return React.createElement(component, filteredProps)
      }
    })
  }
  return render
}
