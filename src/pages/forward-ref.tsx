import { forwardRef, useImperativeHandle, useRef } from 'react'

import { Button } from '@/components/ui/button'

export default function ForwardRefExample() {
  const ref = useRef<HTMLInputElement | null>(null)
  return (
    <form>
      <MyInput ref={ref} />
      <Button
        type="button"
        onClick={() => {
          ref.current?.focus()
        }}>
        Focus Input
      </Button>
    </form>
  )
}

const MyInput = forwardRef(function MyInput(props, ref) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  useImperativeHandle(
    ref,
    () => {
      return {
        focus() {
          inputRef.current?.focus()
        }
      }
    },
    []
  )
  return <input className="rounded-md border" {...props} ref={inputRef} />
})
