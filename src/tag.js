import styledFn from './react'
import tags from './lib/tags'
let styled = styledFn

function assembleClasses(arg1, arg2) {
  const [strings, ...interpolations] = arg1
  const { props, theme } = arg2
  let str = strings[0]
  for (let i = 0; i < interpolations.length; i++) {
    str +=
      typeof interpolations[i] === 'function'
        ? interpolations[i](props, theme)
        : interpolations[i]
    str += strings[i + 1]
  }
  return str.replace(/\s{1,}/g, ' ').trim()
}

tags.forEach(tag => {
  styled[tag] = (...rest) => {
    return styledFn(tag, (props, theme) =>
      assembleClasses(rest, { props, theme })
    )
  }
})

export default styled
