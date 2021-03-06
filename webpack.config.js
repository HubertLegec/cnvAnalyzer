const Webpack = require('webpack');
const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProduction = process.argv.indexOf('-p') >= 0;
const outPath = Path.join(__dirname, './build');
const sourcePath = Path.join(__dirname, './src');

module.exports = {
    context: sourcePath,
    entry: {
        main: './index.tsx',
        vendor: [
            'react',
            'react-dom',
            'react-redux',
            'react-router',
            'redux'
        ]
    },
    output: {
        path: outPath,
        publicPath: '/',
        filename: 'bundle.js',
    },
    target: 'web',
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        // Fix webpack's default behavior to not load packages with jsnext:main module
        // https://github.com/Microsoft/TypeScript/issues/11677
        mainFields: ['browser', 'main']
    },
    module: {
        loaders: [
            // .js for plotly
            {
                test: /\.js$/,
                use: 'ify-loader'
            },
            // .ts, .tsx
            {
                test: /\.tsx?$/,
                use: isProduction
                    ? 'awesome-typescript-loader?module=es6'
                    : [
                        'react-hot-loader/webpack',
                        'awesome-typescript-loader'
                    ]
            },
            // css
            {
                test: /\.scss|.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')],
                        }
                    },
                    'sass-loader'
                ]
            },
            // static assets
            {test: /\.html$/, use: 'html-loader'},
            {test: /\.png$/, use: 'url-loader?limit=10000'},
            {test: /\.jpg$/, use: 'file-loader'},
        ]
    },
    plugins: [
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': isProduction === true ? JSON.stringify('production') : JSON.stringify('development')
        }),
        new Webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js',
            minChunks: Infinity
        }),
        new Webpack.optimize.AggressiveMergingPlugin(),
        new ExtractTextPlugin({
            filename: 'styles.css',
            disable: !isProduction
        }),
        new HtmlWebpackPlugin({
            template: './../public/index.html'
        })
    ],
    devServer: {
        contentBase: sourcePath,
        hot: true,
        stats: {
            warnings: false
        }
    },
    node: {
        // workaround for webpack-dev-server issue
        // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
        fs: 'empty',
        net: 'empty'
    }
};
