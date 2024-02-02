import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gray-50">
      <p className="text-4xl">Deep Dive React</p>
      <div className="flex w-full flex-wrap justify-center gap-8 ">
        <Link to="/controller-render" className="cursor-pointer">
          <Button variant="outline">可控性渲染</Button>
        </Link>
        <Link to="/render-function" className="cursor-pointer">
          <Button variant="outline">
            {`<Component />
            和Component()的渲染区别`}
          </Button>
        </Link>

        <Link to="/static-property" className="cursor-pointer">
          <Button variant="outline">静态属性</Button>
        </Link>

        <Link to="/event-bus" className="cursor-pointer">
          <Button variant="outline">组件通信之事件总线</Button>
        </Link>

        <Link to="/hoc-props-proxy" className="cursor-pointer">
          <Button variant="outline">HOC之属性代理</Button>
        </Link>

        <Link to="/hoc-error-boundary" className="cursor-pointer">
          <Button variant="outline">HOC之错误边界</Button>
        </Link>

        <Link to="/render-slice" className="cursor-pointer">
          <Button variant="outline">渲染分片</Button>
        </Link>

        <Link to="/compound-pattern" className="cursor-pointer">
          <Button variant="outline">组合模式</Button>
        </Link>

        <Link to="/batch-update" className="cursor-pointer">
          <Button variant="outline">事件循环</Button>
        </Link>

        <Link to="/flush-sync" className="cursor-pointer">
          <Button variant="outline">改变渲染优先级</Button>
        </Link>

        <Link to="/external-store" className="cursor-pointer">
          <Button variant="outline">use-external-store</Button>
        </Link>
      </div>
    </div>
  )
}
