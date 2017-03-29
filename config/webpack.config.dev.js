const webpack = require('webpack')
const path = require('path')
const pxtorem = require('postcss-pxtorem')
const postcss = require('postcss')
/*获取项目root path*/
const root_path = path.resolve(__dirname, '../')
console.log(root_path)

const port = process.env.PORT || 3000
const rootName = process.env.ROOTNAME || ''

const config = {
    devtool: "source-map",
    entry: [
        'eventsource-polyfill',
        'webpack-hot-middleware/client',
        root_path+'/client/index.jsx'       // 定义入口文件
    ],
    output: {                                       // 定义出口目录
        path: root_path+'build',
        filename: 'bundle.js',
        publicPath: rootName+'/build/'
    },
    resolve: {
        modulesDirectories: ['node_modules', root_path+'/node_modules'],
        extensions: ['', '.web.js', '.js', '.jsx', '.json']
    },
    module: {
        loaders: [
            {
                test: /\.js|jsx$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ['react-hot','babel']
            },
            {
                test: /(\.css|\.scss)$/,
                loaders: ["style", "css?sourceMap","postcss", "sass?sourceMap"]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'url?limit=10000&name=img/[hash:8].[name].[ext]',
                    'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
                ]
            }
        ]
    },
    postcss:[pxtorem({
        rootValue: 75,
        propWhiteList: [],
    })],
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ]
}
console.log(config.output.path)

module.exports = config
