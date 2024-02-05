/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react'

import { Button } from '@/components/ui/button'

export default function Event() {
  const ref = useRef<HTMLButtonElement | null>(null)
  useEffect(() => {
    const handleClick = () => {
      console.log('原生的click事件系统')
    }
    ref.current?.addEventListener('click', handleClick)
    return () => {
      ref.current?.removeEventListener('click', handleClick)
    }
  }, [])
  return (
    <div
      onClick={() => {
        console.log('father click')
      }}>
      <Button
        ref={ref}
        onClickCapture={() => {
          console.log('son click with clickcapture')
        }}
        onClick={(e) => {
          e.stopPropagation()
          console.log('son click')
        }}>
        click
      </Button>
    </div>
  )
}
