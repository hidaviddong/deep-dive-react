import { FunctionComponent, useEffect, useState } from 'react'

function ComponentA() {
  return (
    <div className="col-start-1 col-end-2 row-start-1 row-end-3 flex items-center justify-center bg-gray-100">
      ComponentA Render!
    </div>
  )
}

function ComponentB() {
  return (
    <div className="col-start-2 col-end-3 row-start-1 row-end-2 flex items-center justify-center bg-gray-200">
      ComponentB Render!
    </div>
  )
}

function ComponentC() {
  return (
    <div className="col-start-2 col-end-3 row-start-2 row-end-3 flex items-center justify-center bg-gray-300">
      {' '}
      ComponentC Render!
    </div>
  )
}

function withSequentialRender(...components: FunctionComponent[]): FunctionComponent {
  return () => {
    const [currentComponentIndex, setCurrentComponentIndex] = useState(0)

    useEffect(() => {
      if (currentComponentIndex < components.length - 1) {
        const timer = setTimeout(() => {
          setCurrentComponentIndex(currentComponentIndex + 1)
        }, 1000) // 设置延时以渲染下一个组件

        return () => clearTimeout(timer)
      }
    }, [currentComponentIndex])

    return (
      <>
        {components.slice(0, currentComponentIndex + 1).map((Component, index) => (
          <Component key={index} />
        ))}
      </>
    )
  }
}

const RenderSequence = withSequentialRender(ComponentB, ComponentA, ComponentC)
export default function RenderSlice() {
  return (
    <div className="grid h-full w-full grid-cols-2 grid-rows-2">
      <RenderSequence />
    </div>
  )
}
