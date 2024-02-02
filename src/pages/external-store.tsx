/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'

let nextId = 1
let todos = [0]
let listeners: Array<() => void> = []

const todosStore = {
  addTodo() {
    todos = [...todos, nextId++]
    emitChange()
  },
  subscribe(listener: () => void) {
    listeners = [...listeners, listener]
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  },
  getSnapshot() {
    return todos
  }
}

function emitChange() {
  for (const listener of listeners) {
    listener()
  }
}

export default function ExternalStore() {
  const todos = useMockSyncExternalStore(todosStore.subscribe, todosStore.getSnapshot)
  return (
    <div>
      <Button onClick={() => todosStore.addTodo()}>+1</Button>
      <ul>
        {todos.map((todo: any) => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </div>
  )
}

function useMockSyncExternalStore(subscribe: any, getSnapshot: any) {
  const [, forceUpdate] = useState({})
  const ref = useRef({ value: getSnapshot(), getSnapshot })

  const checkIfSnapShotChange = () => {
    try {
      const nextValue = ref.current?.getSnapshot()
      return ref.current?.value !== nextValue
    } catch (error) {
      return true
    }
  }

  // 更新值 + 强制渲染
  const handleStoreChange = () => {
    if (ref.current && checkIfSnapShotChange()) {
      ref.current.value = ref.current.getSnapshot()
      forceUpdate({})
    }
  }

  useEffect(() => {
    const unsubscribe = subscribe(handleStoreChange)
    return unsubscribe
  }, [subscribe])

  useEffect(() => {
    handleStoreChange()
  }, [])
  return ref.current && ref.current.value
}
