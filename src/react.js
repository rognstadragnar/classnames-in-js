import React from 'react'
import tags from './lib/tags'
import { isPropValid, cleanClassesTag } from './lib/index'
import createRender from './lib/create-react-render'
import Theme from './lib/react-theme-context'

function styledFn(tag, styledClassName) {
  const render = createRender(tag, styledClassName, isPropValid)
  return React.forwardRef
    ? React.forwardRef(render)
    : // React.forwardRef won't available on older React versions and in Preact
      // Fallback to a innerRef prop in that case
      ({ innerRef, ...rest }) => render(rest, innerRef)
}

let styled = styledFn

tags.forEach(tag => {
  styled[tag] = (...rest) => {
    return styledFn(tag, (props, theme) =>
      cleanClassesTag(rest, { props, theme })
    )
  }
})

export { styled, Theme }
