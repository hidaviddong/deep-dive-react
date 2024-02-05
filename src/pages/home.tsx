import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

// 定义所有路由和对应的标签
const routes = [
  { path: '/controller-render', label: '可控性渲染' },
  { path: '/render-function', label: '<Component /> 和 Component() 的渲染区别' },
  { path: '/static-property', label: '静态属性' },
  { path: '/event-bus', label: '组件通信之事件总线' },
  { path: '/hoc-props-proxy', label: 'HOC之属性代理' },
  { path: '/hoc-error-boundary', label: 'HOC之错误边界' },
  { path: '/render-slice', label: '渲染分片' },
  { path: '/compound-pattern', label: '组合模式' },
  { path: '/batch-update', label: '事件循环' },
  { path: '/flush-sync', label: '改变渲染优先级' },
  { path: '/external-store', label: 'useExternalStore' },
  { path: '/use-layout-effect', label: 'useLayoutEffect' },
  { path: '/virtual-list', label: '虚拟列表' },
  { path: '/forward-ref', label: 'forwardRef' },
  { path: '/echart-ref', label: 'echart-ref' },
  { path: '/event', label: '事件系统' }
]

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gray-50">
      <p className="text-4xl">Deep Dive React</p>
      <div className="flex w-full flex-wrap justify-center gap-8">
        {routes.map(({ path, label }) => (
          <Link key={path} to={path} className="cursor-pointer">
            <Button variant="outline">{label}</Button>
          </Link>
        ))}
      </div>
    </div>
  )
}
