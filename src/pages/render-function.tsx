import { useState } from 'react'

import { Button } from '@/components/ui/button'

const OutHeader = () => {
  console.log('OutHeader is render')
  return <div>OutHeader</div>
}
const OutMain = () => {
  console.log('OutMain is render')
  return <div>OutMain</div>
}
const OutFooter = () => {
  console.log('OutFooter is render')
  return <div>OutFooter</div>
}
export default function RenderFunction() {
  const [counter, setCounter] = useState(0)
  const Header = () => {
    console.log('Header is render')
    return <div>Header</div>
  }
  const Main = () => {
    console.log('Main is render')
    return <div>Main</div>
  }
  const Footer = () => {
    console.log('Footer is render')
    return <div>Footer</div>
  }
  return (
    <>
      <p className="text-2xl">打开控制台看：1、re-render高亮情况。2、看React组件树少了些什么？</p>
      <Button
        variant="ghost"
        onClick={() => {
          setCounter(counter + 1)
        }}>
        {counter}
      </Button>
      <p>表面上看没有重新渲染，但实际上是因为重新创建了一个新的</p>
      <Header />
      <Main />
      <Footer />
      <p>重新创建了一个</p>
      {Header()}
      {Main()}
      {Footer()}
      <p>重新渲染了</p>
      <OutHeader />
      <OutMain />
      <OutFooter />
      <p>重新创建了一个</p>
      {OutHeader()}
      {OutMain()}
      {OutFooter()}
    </>
  )
}
