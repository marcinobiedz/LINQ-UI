module.exports = {
    entry: {
        'vendor': ['d3'],
        'app': './src/main.ts'
    },
    exclude: 'node_modules',
    output: {
        path: 'dist',
        filename: '[name].js'
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
