/**
 * 目标：
 * 1、不渲染有vue的节点 ✅
 * 2、手动添加一个新的节点 ✅
 */
import React from 'react'
const toLearn = ['vue', 'react', 'solid']

export default function ControllerRender() {
  const Element = (
    <>
      <p>可控性渲染</p>
      {toLearn.map((item) => (
        <p key={item}>study {item}</p>
      ))}
    </>
  )
  // 扁平化
  const { children } = Element.props
  const flatChildren = React.Children.toArray(children)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const newChildren: any[] = []
  React.Children.forEach(flatChildren, (item) => {
    if (React.isValidElement(item)) {
      const childItemArray = React.Children.toArray(item.props.children)
      if (!childItemArray.includes('vue')) {
        newChildren.push(item)
      }
    }
  })
  const lastChildren = React.createElement('div', {}, '这是手动插入的节点')
  newChildren.push(lastChildren)
  return React.cloneElement(Element, {}, ...newChildren)
}
