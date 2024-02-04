import * as echarts from 'echarts'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'

export default function EchartRef() {
  const [count, setCounter] = useState(0)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const echartsRef = useRef<echarts.EChartsType | null>(null)
  useEffect(() => {
    if (!echartsRef.current) {
      echartsRef.current = echarts.init(containerRef.current)
      console.log('ECharts instance created with ref')
    }
    echartsRef.current.setOption({
      title: {
        text: 'ECharts Getting Started Example'
      },
      tooltip: {},
      xAxis: {
        data: ['shirt', 'cardigan', 'chiffon', 'pants', 'heels', 'socks']
      },
      yAxis: {},
      series: [
        {
          name: 'sales',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    })

    // 如果这样写的话，每次都会重新创建echarts实例
    // const instance = echarts.init(containerRef.current)
    // console.log('ECharts instance created without ref')
    // instance.setOption({
    //   title: {
    //     text: 'ECharts Getting Started Example'
    //   },
    //   tooltip: {},
    //   xAxis: {
    //     data: ['shirt', 'cardigan', 'chiffon', 'pants', 'heels', 'socks']
    //   },
    //   yAxis: {},
    //   series: [
    //     {
    //       name: 'sales',
    //       type: 'bar',
    //       data: [5, 20, 36, 10, 10, 20]
    //     }
    //   ]
    // })
  }, [count])

  return (
    <div>
      <div className="h-48 w-96" ref={containerRef}></div>
      <Button onClick={() => setCounter(count + 1)}>{count}</Button>
    </div>
  )
}
