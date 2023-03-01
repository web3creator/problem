import { IApi } from 'umi';
import file_loader from "file-loader"
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
export default (api: IApi) => {
    api.chainWebpack((memo, { webpack, env }) => {
        // memo.resolve.alias.set("fs", 'browserfs/dist/shims/fs.js')
        // memo.resolve.alias.set("buffer", 'browserfs/dist/shims/buffer.js')
        // memo.resolve.alias.set("path", 'browserfs/dist/shims/path.js')
        // memo.resolve.alias.set("processGlobal", 'browserfs/dist/shims/process.js')
        // memo.resolve.alias.set("bufferGlobal", 'browserfs/dist/shims/bufferGlobal.js')
        // memo.resolve.alias.set("bfsGlobal", require.resolve('browserfs'))
        // const provideplugin = webpack.ProvidePlugin
        // memo.plugin("browserfs-provide-plugin").use(provideplugin, [{
        //     BrowserFS: 'bfsGlobal',
        //     process: 'processGlobal',
        //     Buffer: 'bufferGlobal',
        // }])
        memo.plugins.delete('node-polyfill-provider')
        // memo.resolve.fallback.clear()
        memo.resolve.fallback.merge({
            fs: 'browserfs/dist/shims/fs.js',
            buffer: 'browserfs/dist/shims/buffer.js',
            path: 'browserfs/dist/shims/path.js',
            processGlobal: 'browserfs/dist/shims/process.js',
            bufferGlobal: 'browserfs/dist/shims/bufferGlobal.js',
            bfsGlobal: require.resolve('browserfs'),
        })
        memo.module.noParse(/browserfs\.js$/)
        memo.plugin('browserfs-plugin').use(webpack.ProvidePlugin, [
            {
                BrowserFS: 'bfsGlobal',
                process: 'processGlobal',
                Buffer: 'bufferGlobal',
            },
        ])

    })
    api.modifyWebpackConfig((memo, { webpack, env }) => {

        memo.module?.rules?.push({ test: /\.png$/, use: 'file-loader' })
        memo.module?.rules?.push(
            {
                test: /\.png$/,
                use: 'file-loader',
            });

        memo.module?.rules?.push(
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                            publicPath: 'https://g.alicdn.com/tao-ide/ide-front/0.0.8/fonts', //"http://localhost:8081/fonts"
                        },
                    },
                ],
            })
        console.log(memo.module?.rules)
        return memo;
    })

};