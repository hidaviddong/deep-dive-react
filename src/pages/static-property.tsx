import { PropsWithChildren } from 'react'

function Foo(props: PropsWithChildren) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      Foo
      {props.children}
    </div>
  )
}
Foo.Item = function () {
  return <div>Foo.Item</div>
}
Foo.Bar = function () {
  return <div>Foo.Bar</div>
}
export default function StaticProperty() {
  return (
    <Foo>
      <Foo.Item />
      <Foo.Bar />
    </Foo>
  )
}
