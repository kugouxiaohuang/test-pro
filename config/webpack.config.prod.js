const webpack = require('webpack')
const path = require('path')
const pxtorem = require('postcss-pxtorem')
const postcss = require('postcss')
/*获取项目root path*/
const root_path = path.resolve(__dirname, '../')
const rootName = process.env.ROOTNAME || ''

const config = {
    devtool: 'source-map',
    entry: [
        root_path+'/client/index.jsx'
    ],
    output: {
        path: root_path+'/build',
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
                loaders: ['babel']
            },
            {
                test: /(\.css|\.scss)$/,
                loaders: ["style", "css","postcss", "sass"]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'url?limit=10000&name=[hash:8].[name].[ext]',
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
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
}

module.exports = config
