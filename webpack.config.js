const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fileloader = require("file-loader");
var webpack = require('webpack');
const path = require('path');
module.exports = {
    entry: './src/index.js',
    devServer: {
        disableHostCheck: true,
        historyApiFallback: {
            index: "/"
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                use: {
                    loader: "babel-loader?cacheDirectory"
                },
            },
            {
                test: /\.svg/,
                use: {
                    loader: 'svg-url-loader',
                    options: {}
                }
            },
            {
                test: /\.ttf$/,
                loader: 'file-loader',
                options: { name: 'static/font/[name].[ext]' }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader']
            },
            {
                test: /\.(jpg|jpeg|ico|gif|eot|woff|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'static/images/[name]-[hash:8].[ext]',
                            publicPath: '/'
                        },
                    },
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve('./src', 'index.html'),
            filename: 'index.html'
        }
        ),
        new MiniCssExtractPlugin({
            filename: "static/css/[name]-[chunkhash:8].css"
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ]
};