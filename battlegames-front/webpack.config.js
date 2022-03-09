// eslint-disable-next-line @typescript-eslint/no-var-requires
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('isomorphic-fetch');
const APP_PATH = path.resolve(__dirname, 'src');

module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                        plugins: [
                            "@babel/proposal-class-properties",
                            "@babel/proposal-object-rest-spread",
                            '@babel/plugin-transform-runtime'
                        ]
                    },
                },
            },
            { test: /\.css$/i,use: ["style-loader", "css-loader"],  },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            stream: require.resolve("stream-browserify"),
            buffer: require.resolve('buffer/'),
        }
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    // Other rules...
    plugins: [
        new HtmlWebpackPlugin({ inject: true, template: path.join(APP_PATH, 'index.html') }),
        new ForkTsCheckerWebpackPlugin({
            async: false,
        }),
        new NodePolyfillPlugin(),
        // Work around for Buffer is undefined:
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
    devServer: {
        client: {
            overlay: false,
        },
    },
};