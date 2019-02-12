import { h } from 'preact'
import { getClassName } from './index'

export default function createRender(tag, styledClassName, isPropValid) {
  function render(props) {
    const { as: component = tag, innerRef, children, ...rest } = props
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
    filteredProps.ref = innerRef
    filteredProps.className = getClassName(props, styledClassName)

    return h(component, filteredProps, children)
  }
  return render
}
