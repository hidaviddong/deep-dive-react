import { PropsWithChildren } from 'react'

function Foo(props: PropsWithChildren) {
  return (
    <>
      Foo
      {props.children}
    </>
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
