const path = require('path');

//根据指定模板在内存中生成一个首页，把bundle.js文件绑定在该页面底部
const htmlWebpackPlugin = require('html-webpack-plugin');

//vue模板编译，和vue-loader搭配使用
const vueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: {
        path: path.join(__dirname, './src/main.js') //入口文件
    },
    output: {
        path: path.join(__dirname, './dist'),   //输出目标文件的路径
        filename: "bundle.js"   //输出的目标文件的名称
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'), //模板文件的路径
            filename: 'index.html' //生成内存文件的名称
        }),
        new vueLoaderPlugin()
    ],
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            //图片小于7631字节时：url为二进制，大于时：图片哈希值6位-文件本身名字.文件后缀名
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=7631&name=[hash:8]-[name].[ext]' },
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' },
            { test: /\.vue$/, use: 'vue-loader' }
        ]
    }
}