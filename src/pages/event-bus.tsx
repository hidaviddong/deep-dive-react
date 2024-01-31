import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

// 这种方式的组件通信会造成牵一发而动全身的影响，而且后期难以维护，组件之间的状态也是未知的

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FunctionType = (...params: any[]) => void
class EventBus {
  event: Map<string, Array<FunctionType>>
  constructor() {
    this.event = new Map()
  }
  on(eventName: string, callback: FunctionType) {
    if (this.event.get(eventName)) {
      this.event.get(eventName)?.push(callback)
    } else {
      this.event.set(eventName, [callback])
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit(eventName: string, ...params: any) {
    if (this.event.get(eventName)) {
      this.event.get(eventName)?.forEach((cb) => {
        cb(...params)
      })
    }
  }
  off(eventName: string) {
    if (this.event.get(eventName)) {
      this.event.delete(eventName)
    }
  }
}
const BusService = new EventBus()

export default function EventBusFoo() {
  const [counter, setCounter] = useState(0)
  useEffect(() => {
    BusService.on('counter', (value) => {
      setCounter(value)
    })

    BusService.on('increment', () => {
      setCounter((prev) => prev + 1)
    })
    return () => {
      BusService.off('counter')
      BusService.off('increment')
    }
  }, [])
  return (
    <>
      这是父组件里定义的useState值：{counter}
      <EventBusBar />
    </>
  )
}
function EventBusBar() {
  return (
    <>
      <p>下面这个Button来自于子组件</p>
      <Button onClick={() => BusService.emit('counter', 10)}>点击我，让父组件里的数据变成10</Button>
      <Button onClick={() => BusService.emit('increment')}>点击我，让父组件里的数据变成+1</Button>
    </>
  )
}
