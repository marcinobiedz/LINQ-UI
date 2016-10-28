module.exports = {
    entry: {
        'vendor': ['d3'],
        'app': ['./src/styles/main.less', './src/app/MainWindow.ts']
    },
    exclude: 'node_modules',
    output: {
        path: 'dist',
        filename: '[name].js',
        library: "TreeAnalyzer",
        libraryTarget: "umd"
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
