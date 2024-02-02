import { useState } from 'react'

import { Button } from '@/components/ui/button'

export default function BatchUpdate() {
  const [count, setCount] = useState(0)
  // useEffect(() => {
  //   // 宏任务
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   let timer: any
  //   function run() {
  //     timer = setTimeout(() => {
  //       console.log('-- 宏任务执行 --')
  //       run()
  //     }, 0)
  //     // 微任务 会影响页面渲染
  //     // Promise.resolve().then(() => {
  //     //   run()
  //     // })
  //   }
  //   run()
  //   return () => clearTimeout(timer)
  // }, [])
  return (
    <div>
      <p>宏任务不影响页面渲染，微任务影响</p>
      <Button onClick={() => setCount(count + 1)}>{count}</Button>
    </div>
  )
}

/**
 *  微任务/宏任务实现批量更新
 *  console.log('宏任务逻辑')
 *  console.log('开始合并更新')
 *  console.log('第一次更新')
 *  console.log('第二次更新')
 *  console.log('结束合并更新')
 */

function runUpdate(queue: Array<() => void>) {
  console.log('开始合并更新')
  while (queue.length > 0) {
    const callback = queue.shift()
    callback && callback()
  }
  console.log('结束合并更新')
}
class Scheduler {
  callbacks: Array<() => void>
  constructor() {
    this.callbacks = []
    queueMicrotask(() => {
      this.runTask()
    })
  }
  addTask(fn: () => void) {
    this.callbacks.push(fn)
  }
  runTask() {
    runUpdate(this.callbacks)
  }
}

export function runBatchUpdateWithTask() {
  const scheduler = new Scheduler()
  scheduler.addTask(() => {
    console.log('第一次更新')
  })
  console.log('宏任务逻辑')
  scheduler.addTask(() => {
    console.log('第二次更新')
  })
}

// runBatchUpdateWithTask()

/**
 * 可控渲染实现批量更新
 */

let shouldUpdate = false
const callbacksQueue: Array<() => void> = []

function wrapEvent(fn: () => void) {
  return function () {
    shouldUpdate = true
    fn()
    runUpdate(callbacksQueue)
    shouldUpdate = false
  }
}

function setState(fn: () => void) {
  if (shouldUpdate) {
    callbacksQueue.push(fn)
  } else {
    fn()
  }
}

function runBatchUpdateWithControl() {
  setState(() => {
    console.log('更新一')
  })
  console.log('执行上下文')
  setState(() => {
    console.log('更新二')
  })
}
const wrapRunBatchUpdateWithControl = wrapEvent(runBatchUpdateWithControl)
wrapRunBatchUpdateWithControl()
