const path = require("path")
const webpack = require('webpack')

module.exports = {
    entry:'./src/index.js',
    output:{
        path:path.join(__dirname , 'dist'),
        filename:'index.bundle.js'
    },
    devServer:{
        publicPath:'/assets/',
        contentBase: path.join(__dirname , 'static'),
        compress: true,
        port: 9090
    },
    module:{
        rules:[
            {test:/\.js$/ ,exclude:/node_modules/, loader:'babel-loader'}
        ]
    },
    plugins:[
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ]
}