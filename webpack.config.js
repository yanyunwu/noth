const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {

    mode: 'development',

    /** 设置报错信息指引 */
    devtool: 'source-map',

    entry: './test.js',
    output: {
        filename: 'nuht.js',
        path: resolve(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                /** ts解析 */
                test: /\.ts$/,
                use: ['ts-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ],
    },

    resolve: {
        /** 设置可以被检测的模块(省略文件后缀名) */
        extensions: ['.js', '.ts']
    },

    plugins: [
        /** 生成html模板 */
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],

    devServer: {
        static: {
            directory: resolve(__dirname, 'src'),
        },
        compress: false,
        port: 9000,
        client: {
            logging: 'none',
            overlay: true,
        },
    }

}