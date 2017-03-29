'use strict'

const express = require('express')
const path = require('path')
const ejs = require('ejs')
const webpack =require('webpack')
const bodyParser = require('body-parser')
const request = require('request')
const proxy=require('http-proxy-middleware')
const app = express()

const env = process.env.NODE_ENV || 'lo'
const port = process.env.PORT || 3000
const rootName = process.env.ROOTNAME || ''

const proxyConfig = require('./config/proxy.config')

proxyConfig.createProxys(app,env,rootName)

if(env === 'lo'){
  let config = require('./config/webpack.config.dev')
  let compiler = webpack(config)
  app.use(require('webpack-dev-middleware')(compiler,{
    noInfo:true,
    publicPath:config.output.publicPath
  }))
  app.use(require('webpack-hot-middleware')(compiler))
}else{
  webpack(require('./config/webpack.config.prod'))
}

app.use(rootName+'/build',express.static('build'))
app.set('views',path.join(__dirname,'views'))
app.engine('.html',ejs.__express)
app.set('view engine','html')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get('*',function (req, res) {
  var SystemProperty={}
  SystemProperty.rootName = rootName
  SystemProperty.headers = req.headers
  SystemProperty.user = {uid:''}
  var script = "<script>var SystemProperty="+JSON.stringify(SystemProperty)+"</script>"
  res.render('index',{script:script,SystemProperty:SystemProperty})
})

app.listen(port,function (err) {
  if(err){
    console.log(err)
    return
  }
  console.log('Startup environment'+env)
  console.log('Listening at http://localhost:'+port)
})

