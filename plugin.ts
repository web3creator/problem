import { IApi } from 'umi';
import file_loader from "file-loader"
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
export default (api: IApi) => {
    api.chainWebpack((memo, { webpack, env }) => {
        memo.resolve.alias.set("fs", 'browserfs/dist/shims/fs.js')
        memo.resolve.alias.set("buffer", 'browserfs/dist/shims/buffer.js')
        memo.resolve.alias.set("path", 'browserfs/dist/shims/path.js')
        memo.resolve.alias.set("processGlobal", 'browserfs/dist/shims/process.js')
        memo.resolve.alias.set("bufferGlobal", 'browserfs/dist/shims/bufferGlobal.js')
        memo.resolve.alias.set("bfsGlobal", require.resolve('browserfs'))
        const provideplugin = webpack.ProvidePlugin
        memo.plugin("browserfs-provide-plugin").use(provideplugin, [{
            BrowserFS: 'bfsGlobal',
            process: 'processGlobal',
            Buffer: 'bufferGlobal',
        }])

    })
    api.modifyWebpackConfig((memo, { webpack, env }) => {
    
        console.log(memo.module?.rules)
        return memo;
    })

};