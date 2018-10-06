const path = require("path")
const UglifyJS = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry:{
        index: './src/index.js',
        a:'./src/a.js'
    },
    devtool: 'inline-source-map',
    output:{
        path:path.join(__dirname , 'dist'),
        filename:'[name].bundle.js'
    },
    devServer:{
        contentBase: [path.join(__dirname , 'dist'), path.join(__dirname , 'static')],
        compress: true,
        port: 9090
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        minimizer:[new UglifyJS()]
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