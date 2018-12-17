const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist/assets/js')
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: {
                    loader: "raw-loader"
                }
            },
        ]
    },
    watch: true,
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    }
};