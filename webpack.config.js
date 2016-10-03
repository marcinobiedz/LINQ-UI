module.exports = {
    entry: './src/main.ts',
    output: {
        filename: './dist/bundle.js',
        sourceMapFilename: './dist/bundle.js.map'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.ts']
    },
    module: {
        loaders: [
            {test: /.ts$/, loader: 'ts-loader'}
        ]
    }
};