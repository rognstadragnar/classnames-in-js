import React from 'react'
import { getClassName } from './index'
import Theme from './react-theme-context'

export default function createRender(tag, styledClassName, isPropValid) {
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
