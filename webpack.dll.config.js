const path = require('path');
const webpack = require('webpack');
module.exports = {
    mode: "production",
    entry: {
        vendors: [
            'vue',
            'vuex',
            'vue-router',
            'axios'
        ]
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, './static/dll'),
        library: '[name]',
        clean: true
    },
    // 这个是输出映射表
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, './[name].manifest.json'),
            name: '[name]',
            context: __dirname // 这里的上下文要和我们后面用的DllReferencePlugin的上下文一致。
        })
    ]
};
