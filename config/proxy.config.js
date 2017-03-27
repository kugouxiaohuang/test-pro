'use strict'
const proxy = require('http-proxy-middleware')

const targets = {
    healthDiseaseApi:{
        lo: 'http://10.1.64.194/neohealthcloud-disease',
        de: 'http://10.1.64.194/neohealthcloud-disease',
        te: 'http://10.1.64.195/neohealthcloud-disease',
        re: 'http://10.1.67.108/neohealthcloud-disease',
        pe: 'http://172.17.13.31/neohealthcloud-disease'
    },
    healthcloudApi:{
        lo: 'http://10.1.64.194/neohealthcloud-internal',
        de: 'http://10.1.64.194/neohealthcloud-internal',
        te: 'http://10.1.64.195/neohealthcloud-internal',
        re: 'http://10.1.67.108/neohealthcloud-internal',
        pe: 'http://172.17.13.31/neohealthcloud-internal'
    }
}
/*
 *[createProxys批量创建代理]
 *@param {[type]} app      [express()]
 *@param {[type]} env      [环境表示]
 *@param {[type]} rootName [项目根目录]
*/

function createProxys(app,env,rootName) {
    for (var key in targets){
        var apiName = rootName+'/'+key+"/"
        var target = targets[key][env]
        var _config = {target:target,pathRewrite:{},changeOrigin:true}
        _config.pathRewrite['^'+apiName] = '/'
        var apiProxy = proxy(_config)
        app.use(apiName,apiProxy)
    }
}
function keys() {
    var _keys = {}
    for (var key in targets){
        _keys[key] = key
    }
    return _keys
}

var config = {
    createProxys:createProxys,
    targets:targets,
    keys:keys
}
module.exports=config