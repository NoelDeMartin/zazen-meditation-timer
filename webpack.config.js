const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let inProduction = process.env.NODE_ENV === 'production';

module.exports = {

    entry: {
        app: [
            './src/app.ts',
            './src/app.scss'
        ]
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
                    name: 'fonts/[name].[hash].[ext]'
                }
            },

        ]

    },

    plugins: [
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
        })
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
