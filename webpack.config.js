const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

var config = {
    entry: {
        index: './src/app.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                use: 'babel-loader'
            },
            {
                test: /\.(css|scss)?$/,
                use: ['style', 'css', 'sass'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
        ]
    },
    output: {
        filename: "bundle.[hash].js",
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + './src/index.html',
        }),
        new CopyPlugin([
            { from: 'src/assets', to: 'assets' }
        ]),
    ]
};

module.exports = (env, argv) => {
    config.mode = argv.mode;
    if (argv.mode === 'development') {
        config.devtool = 'source-map';
    }
    return config;
};