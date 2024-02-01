/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from 'react'

interface ListItem {
  id: number
  name: string
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getList(): Promise<ListItem[] | any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      Math.random() < 0.5
        ? resolve([
            {
              id: 1,
              name: 'haha'
            }
          ])
        : // 此处假设后端返回的数据格式错误！
          resolve({
            id: 1,
            name: 'haha'
          })
    }, 2000)
  })
}

export default function HOCErrorBoundary() {
  const [list, setList] = useState<ListItem[] | null>(null)

  useEffect(() => {
    getList().then((res) => {
      // 这里不进行任何数据有效性检查
      setList(res)
    })
  }, [])

  return (
    <>
      <p>体现了class component 的作用 获取生命周期 捕获错误</p>
      {/* 当 list 不是数组时，下面的 map 方法将抛出错误 */}
      <ul>{list?.map((item) => <li key={item.id}>{item.name}</li>)}</ul>
    </>
  )
}
