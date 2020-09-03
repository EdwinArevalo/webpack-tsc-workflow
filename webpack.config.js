const HtmlWebpackPlugin       = require('html-webpack-plugin');
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin              = require('copy-webpack-plugin');
 
const path = require('path'); 

module.exports = {
    entry: './src/index.ts', 
    mode: 'development',
    resolve: {
        extensions: ['.ts','.js','.json']
    },
    optimization: {
        minimizer: [ new OptimizeCssAssetsPlugin({}) ]
    },
    output: {
        filename: 'main.[contentHash].js',
        path: path.join(__dirname, 'dist')
    },  
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.hbs$/,
                use: 'handlebars-loader'
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/',
                            useRelativePath: true
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.hbs',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name]-styles.css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/favicon.ico', to: './favicon.ico' }, 
              ],
        }),
    ]
}