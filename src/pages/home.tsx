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
      </div>
    </div>
  )
}
