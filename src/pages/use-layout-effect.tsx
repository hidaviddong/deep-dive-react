import { createContext, PropsWithChildren, useContext, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { Button } from '@/components/ui/button'

const ContainerContext = createContext<{
  containerHeight: number
}>({
  containerHeight: 0
})

interface targetRectType {
  left: number
  right: number
  top: number
  bottom: number
}

interface TooltipProps {
  targetRect: targetRectType
}

interface TooltipContainerProps {
  x: number
  y: number
  contentRef: React.MutableRefObject<HTMLDivElement | null>
}

function TooltipContainer(props: PropsWithChildren & TooltipContainerProps) {
  return (
    <div
      className="absolute"
      style={{
        left: 0,
        top: 0,
        transform: `translate3d(${props.x}px, ${props.y}px, 0)`
      }}>
      <div ref={props.contentRef} className="text-md w-full bg-black text-white">
        {props.children}
      </div>
    </div>
  )
}
function Tooltip(props: PropsWithChildren & TooltipProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [tooltipHeight, setTooltipHeight] = useState(0)
  useLayoutEffect(() => {
    const { height } = ref.current!.getBoundingClientRect()
    setTooltipHeight(height)
  }, [])
  const context = useContext(ContainerContext)
  let tooltipX = 0
  let tooltipY = 0
  if (props.targetRect) {
    tooltipX = props.targetRect.left
    tooltipY = props.targetRect.top - tooltipHeight
    if (tooltipY - context.containerHeight < 0) {
      tooltipY = props.targetRect.bottom
    }
  }
  return createPortal(
    <TooltipContainer contentRef={ref} x={tooltipX} y={tooltipY}>
      {props.children}
    </TooltipContainer>,
    document.body
  )
}

function ButtonWithTooltip(props: PropsWithChildren) {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const [targetRect, setTargetRect] = useState<targetRectType | null>(null)
  return (
    <Button
      {...props}
      ref={buttonRef}
      onPointerEnter={() => {
        const rect = buttonRef.current!.getBoundingClientRect()
        setTargetRect({
          left: rect.left,
          right: rect.right,
          top: rect.top,
          bottom: rect.bottom
        })
      }}
      onPointerLeave={() => {
        setTargetRect(null)
      }}>
      {props.children}
      {targetRect && (
        <>
          <Tooltip targetRect={targetRect}>Hello! Tooltip</Tooltip>
        </>
      )}
    </Button>
  )
}

export default function LayoutEffect() {
  const divRef = useRef<HTMLDivElement | null>(null)
  const [containerHeight, setContainerHeight] = useState(0)
  useLayoutEffect(() => {
    setContainerHeight(divRef.current!.getBoundingClientRect().y)
  }, [])
  return (
    <ContainerContext.Provider value={{ containerHeight }}>
      <div ref={divRef} className="flex-start flex h-36 w-40 flex-col gap-y-5 bg-red-200 p-4">
        <ButtonWithTooltip>Hover me </ButtonWithTooltip>
        <ButtonWithTooltip>Hover me </ButtonWithTooltip>
      </div>
    </ContainerContext.Provider>
  )
}
