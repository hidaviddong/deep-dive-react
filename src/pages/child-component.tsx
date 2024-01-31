import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export default function ChildComponent(props: React.PropsWithChildren) {
  return (
    <>
      <Link to="/" className="w-full cursor-pointer">
        <Button className="w-full" variant="link">
          去首页
        </Button>
      </Link>
      <div className="flex h-full w-full flex-col items-center justify-center">{props.children}</div>
    </>
  )
}
