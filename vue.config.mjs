import Components from 'unplugin-vue-components/webpack'
import {BootstrapVueNextResolver} from 'bootstrap-vue-next'
export default {
    transpileDependencies: true,
    configureWebpack: {
        plugins: [
        Components({
            resolvers: [BootstrapVueNextResolver()]
        }),
        ],
    },
}