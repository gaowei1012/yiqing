/*
 * @Author: your name
 * @Date: 2020-01-27 12:24:25
 * @LastEditTime : 2020-01-27 14:46:41
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /yiqing/src/api.js
 */
const fs = require('fs')
const Koa = require('koa')
const Router = require('koa-router')
const router = new Router()
const app = new Koa()
const port = 8089
const host = 'localhost'


router.get('/api/data', async(ctx, next) => {
  ctx.body = {
    code: '0'
  }
  await next()
})

// 获取全部地区信息
router.get('/api/data/getAll', async (ctx, next) => {
  let data = await fs.readFileSync('data.json')
  console.log('data',data)
  ctx.response.body = JSON.parse(data)
  await next()
})


// 获取指定省份信息
router.get('/api/data/getAreaStat/:city', async (ctx, next) => {
  let result = await fs.readFileSync('data.json')
  let data = JSON.parse(result)
  let city = ctx.params
  console.log('city', city)
  let areaStat = data.getAreaStat
  if (city) {
    let body = []
    for(let i=0; i<areaStat.lenght; i++) {
      let are = areaStat[i]
      if(area.provinceName === city || area.provinceShortName == provice) {
        body.push(are)
        return 
      }
    }
    ctx.response.body = body;
  } else {
    ctx.response.body = areaStat;
  }

  await next()
})

//获取信息时间线
router.get('/api/data/getTimelineService', async (ctx,next) => {
  let data = JSON.parse(await fs.readFileSync('data.json'))
  let timeline = data.getTimelineService;
  ctx.response.body = timeline;
});

//获取整体统计信息
router.get('/api/data/getStatisticsService', async (ctx,next) => {
  let result = fs.readFileSync('data.json')
  let data = JSON.parse(result)
  let statistics = data.getStatisticsService;
  console.log('statistics',data)
  ctx.response.body = data;
});

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(port,() => {
  console.log(`http://${host}:${port}`)
})
