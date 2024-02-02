import { useState } from 'react'
import { flushSync } from 'react-dom'

import { Button } from '@/components/ui/button'

export default function FlushSync() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    // 第一次：setState，但由于批量更新，这个更新会被暂存，不会立即执行
    setCount(100)

    setTimeout(() => {
      // 定时器中的 setState，会在事件处理函数之后的某个时间点执行
      // 第五次
      setCount(1) // 此更新将在宏任务中执行，因此它是独立的
    })

    // 第二次：setState，这个更新也会被暂存，不会立即执行
    setCount(2)

    // 使用 flushSync 强制 React 竧时处理当前的更新
    flushSync(() => {
      // 第三次：在 flushSync 内部的 setState，这将导致立即渲染，当前暂存的更新（100和2）将被忽略
      setCount(3)
    })

    // 第四次：flushSync 后的 setState，这将是一个新的更新，会在 flushSync 引起的渲染之后执行
    setCount(4)
  }

  // 每次组件渲染时都会打印当前的 count 值
  console.log(count)

  return (
    <div>
      <Button onClick={handleClick}>{count}</Button>
    </div>
  )
}
