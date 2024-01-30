import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import babel from '@babel/core'
const inputFilePath = path.join(path.dirname(import.meta.url), 'element.js')
const outputFilePath = path.join(path.dirname(import.meta.url), 'output.js')

fs.readFile(fileURLToPath(inputFilePath), 'utf-8', (e, data) => {
  if (e) {
    console.error('读取文件时出错:', e)
    return
  }
  const result = babel.transformSync(data, {
    plugins: ['@babel/plugin-transform-react-jsx']
  })
  fs.writeFile(fileURLToPath(outputFilePath), result.code, 'utf8', (err) => {
    if (err) {
      console.error('写入文件时出错:', err)
    } else {
      console.log('文件写入成功')
    }
  })
})
