import gfTable from '../packages/table/table.vue'

const install = function (Vue) {
    if(install.installed) return

    Vue.component(gfTable.name, gfTable)

} 

if(typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    gfTable,
    install
}
