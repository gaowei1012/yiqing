/*
 * @Author: your name
 * @Date: 2020-01-27 12:24:14
 * @LastEditTime : 2020-01-27 13:30:51
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /yiqing/src/app.js
 */
const Axios = require('axios')
const Cheerio = require('cheerio')
const vm = require('vm')
const fs = require('fs')
const url = `https://3g.dxy.cn/newh5/view/pneumonia_peopleapp?from=timeline&isappinstalled=0`

// 获取疫情数据
async function getData() {
  let response = await Axios.get(url)
  // console.log(response)
  let html = response.data
  let $ = Cheerio.load(html)
  let script = $('body > script')
  console.log('script', script.length)
  var global = {
    window: {}
  }
  for(let i=0;i<script.length;i++){
    if(script[i]&&script[i].children.length>0){
      let scriptContent = script[i].firstChild.data
      // console.log('scriptContent', scriptContent)
      vm.createContext(global)
      vm.runInNewContext(scriptContent, global)
    }
    return global.window
  }
}

// 存储数据
async function main() {
  let data = await getData()
  console.log('data',data)
  await fs.writeFileSync('data.json', JSON.stringify(data), {encoding: 'utf8'})
}

main().catch((error) => {
  console.log(error)
  process.exit()
})
