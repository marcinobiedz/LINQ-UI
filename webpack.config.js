module.exports = {
    entry: {
        'app': ['./src/styles/main.less', './src/app/MainWindow.ts']
    },
    exclude: 'node_modules',
    output: {
        path: 'preview',
        filename: '[name].js',
        library: "TreeAnalyzer",
        libraryTarget: "umd"
    },
    devServer: {
        contentBase: './preview',
        publicPath: '/',
        inline: true,
        port: 63342
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    module: {
        loaders: [
            {test: /.ts$/, loader: 'ts-loader', exclude: /node_modules/},
            {test: /.less$/, loader: 'style!css!less', exclude: /node_modules/},
            {test: /.svg$/, loader: 'url-loader', exclude: /node_modules/}
        ]
    }
};
