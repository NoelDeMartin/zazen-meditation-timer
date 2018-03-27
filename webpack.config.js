const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ClearPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

let inProduction = process.env.NODE_ENV === 'production';

module.exports = {

    entry: {
        app: [
            './src/app.ts',
            './src/app.scss'
        ],
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },

    module: {

        rules: [

            // Vue
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: ExtractTextPlugin.extract({
                            use: [
                                'css-loader',
                                'sass-loader',
                                {
                                    loader: 'sass-resources-loader',
                                    options: {
                                        resources: path.resolve(
                                            __dirname, './src/sass/globals.scss'
                                        )
                                    }
                                }
                            ],
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },

            // Typescript
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },

            // Sass
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader'
                })
            },

            // Fonts
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]'
                }
            },

            // Images
            {
                test: /\.png$/,
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]'
                }
            },

        ]

    },

    plugins: [
        new ClearPlugin(['dist'], {
            dist: __dirname,
            verbose: true,
            dry: false,
        }),
        new ExtractTextPlugin('[name].css'),
        new webpack.LoaderOptionsPlugin({
            minimize: inProduction
        }),
        new webpack.DefinePlugin({
            'process.env':
                inProduction
                    ? {
                        NODE_ENV: '"production"'
                    }
                    : {}
        }),
        new CopyPlugin([
            {
                from: path.resolve(__dirname, 'src/icons/*.png'),
                to: path.resolve(__dirname, 'dist/icons/[name].[ext]'),
            },
            {
                from: path.resolve(__dirname, 'src/index.html'),
                to: path.resolve(__dirname, 'index.html'),
            },
            {
                from: path.resolve(__dirname, 'src/service-worker.js'),
                to: path.resolve(__dirname, 'service-worker.js'),
            },
            {
                from: path.resolve(__dirname, 'src/manifest.json'),
                to: path.resolve(__dirname, 'manifest.json'),
            },
        ]),
    ],

    resolve: {
        extensions: [ '*', '.js', '.jsx', '.vue', '.ts', '.tsx' ],
        alias: { 'vue$': 'vue/dist/vue.esm.js' }
    }

};

if (inProduction) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
}
