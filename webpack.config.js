module.exports = {
    entry: {
        'app': ['./src/styles/main.less', './src/app/core/MainWindow.ts']
    },
    exclude: 'node_modules',
    output: {
        path: 'dist',
        filename: '[name].js',
        library: "TreeAnalyzer",
        libraryTarget: "umd"
    },
    devServer: {
        contentBase: './',
        publicPath: '/',
        inline: true,
        port: 8080
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    module: {
        loaders: [
            {test: /.ts$/, loader: 'ts-loader', exclude: /node_modules/},
            {test: /.less$/, loader: 'style!css!less', exclude: /node_modules/}
        ]
    }
};
