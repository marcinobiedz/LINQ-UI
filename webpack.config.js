module.exports = {
    entry: {
        'vendor': ['d3'],
        'app': './src/main.ts'
    },
    exclude: 'node_modules',
    output: {
        path: 'dist',
        filename: '[name].bundle.js'
    },
    devtool: 'source-map',
    resolve: {
        // extensions: ['', '.ts', '.js']
        extensions: ['', '.ts']
    },
    module: {
        loaders: [
            {test: /.ts$/, loader: 'ts-loader', exclude: /node_modules/}
        ]
    }
};
