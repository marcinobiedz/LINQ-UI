module.exports = {
    entry: {
        'vendor': ['d3'],
        'app': './src/MainWindow.ts'
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
            {test: /.ts$/, loader: 'ts-loader', exclude: /node_modules/}
        ]
    }
};
