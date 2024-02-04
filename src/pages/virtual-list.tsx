//dev.to/adamklein/build-your-own-virtual-scroll-part-i-11ib
// https://github.com/dwqs/blog/issues/70
import { memo, useEffect, useMemo, useRef, useState } from 'react'
const MAX_ITEM_LENGTH = 100000

export default function VirtualList() {
  return (
    <>
      {/* NormalScroll 在渲染100000数据的时候很卡！ */}
      {/* <NormalScroll /> */}
      <VirtualScroll />
    </>
  )
}

function useScrollAware() {
  const [scrollTop, setScrollTop] = useState(0)
  const ref = useRef<HTMLDivElement | null>(null)

  const onScroll = (e: Event) =>
    requestAnimationFrame(() => {
      setScrollTop((e.target as HTMLElement).scrollTop)
    })

  useEffect(() => {
    const scrollContainer = ref.current
    setScrollTop(scrollContainer!.scrollTop)
    scrollContainer!.addEventListener('scroll', onScroll)
    return () => scrollContainer!.removeEventListener('scroll', onScroll)
  }, [])
  return { scrollTop, ref }
}

const Item = memo(({ index }: { index: number }) => (
  <div
    style={{
      height: 30
    }}
    className="flex justify-between bg-gray-50 px-2"
    key={index}>
    row index {index}
  </div>
))

// const NormalScroll = () => {
//   const visibleChildren = useMemo(
//     () => new Array(MAX_ITEM_LENGTH).fill(null).map((_, index) => <Item key={index} index={index} />),
//     []
//   )
//   return (
//     <div style={{ height: 300 }} className="overflow-y-scroll">
//       {visibleChildren}
//     </div>
//   )
// }
const VirtualScroll = ({ itemCount = MAX_ITEM_LENGTH, height = 300, childHeight = 30, renderAhread = 20 }) => {
  const { scrollTop, ref } = useScrollAware()
  const totalHeight = itemCount * childHeight

  let startNode = Math.floor(scrollTop / childHeight) - renderAhread
  startNode = Math.max(0, startNode)
  // height 是容器宽度
  let visibleNodeCount = Math.ceil(height / childHeight) + 2 * renderAhread
  visibleNodeCount = Math.min(itemCount - startNode, visibleNodeCount)
  const offsetY = startNode * childHeight
  const visibleChildren = useMemo(
    () =>
      new Array(visibleNodeCount)
        .fill(null)
        .map((_, index) => <Item key={index + startNode} index={index + startNode} />),
    [startNode, visibleNodeCount]
  )

  return (
    <div style={{ height, overflow: 'auto' }} ref={ref}>
      <div
        style={{
          height: totalHeight
        }}>
        <div
          className="flex flex-col gap-y-4"
          style={{
            transform: `translateY(${offsetY}px)`
          }}>
          {visibleChildren}
        </div>
      </div>
    </div>
  )
}
