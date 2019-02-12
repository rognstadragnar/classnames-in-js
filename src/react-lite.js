import React from 'react'
import { createIsPropBlacklisted } from './lib/index'
import createRender from './lib/create-react-render'

export function styled(tag, styledClassName, blacklist = []) {
  const isPropBlacklisted = createIsPropBlacklisted(['blacklist', ...blacklist])

  const render = createRender(tag, styledClassName, isPropBlacklisted)
  return React.forwardRef
    ? React.forwardRef(render)
    : ({ innerRef, ...rest }) => render(rest, innerRef)
}
