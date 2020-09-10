import Vue from 'vue'
import BaConfirmButton from './base-components/ba-confirm-button'
import BaDeleteButton from './base-components/ba-delete-button'
import ProDialogForm from './pro-dialog-form'
import ProForm from './pro-form'
import ProSearch from './pro-search'
import ProSearchTable from './pro-search-table'
import ProTable from './pro-table'

Vue.component(BaDeleteButton.name, BaDeleteButton)
Vue.component(BaConfirmButton.name, BaConfirmButton)
Vue.component(ProForm.name, ProForm)
Vue.component(ProSearch.name, ProSearch)
Vue.component(ProTable.name, ProTable)
Vue.component(ProDialogForm.name, ProDialogForm)
Vue.component(ProSearchTable.name, ProSearchTable)

export {
  BaConfirmButton,
  BaDeleteButton,
  ProDialogForm,
  ProForm,
  ProSearch,
  ProSearchTable,
  ProTable
}
