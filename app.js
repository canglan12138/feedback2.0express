var express = require('express')
var bodyParser = require('body-parser')

var comments = [
  {
    name: '张三',
    message: '你好',
    date: '2020.02.02'
  },
  {
    name: '张三2',
    message: '你好',
    date: '2020.02.02'
  },
  {
    name: '张三3',
    message: '你好',
    date: '2020.02.02'
  },
  {
    name: '张三4',
    message: '你好',
    date: '2020.02.02'
  },
  {
    name: '张三5',
    message: '你好',
    date: '2020.02.02'
  }
]

var app = express()

//配置使用 art-template 模板引擎
/*
* 第一个参数 当渲染以 .html 结尾的文件时，使用 art-template 模板引擎
* express-art-template 是专门用来在 Express 中把 art-template 整合到 Express中
* 虽然不用，但是必须安装，因为依赖了 art-template
* */
app.engine('html',require('express-art-template'))

//配置 body-parser 中间件，用来解析 POST 请求体
/*
* 加入这个配置，req 请求对象会多出来一个属性：body
* 可以直接通过 req.body 来获取表单 POST 请求体数据
* */
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/public',express.static('./public'))

/*
* res.render('html模板名',{模板数据})
* 第一个参数不能写路径，默认会去项目中的 views 目录找该模板文件
* */
app.get('/',(req,res) => {
  res.render('index.html',{
    comments:comments
  })
})
app.get('/post',(req,res) => {
  res.render('post.html')
})

app.post('/post',(req,res) => {
  var comment = req.body
  comment.date = '2020.08.08'
  comments.unshift(comment)
  res.redirect('/')
})
app.listen(3000,() => {
  console.log('app is running');
})
