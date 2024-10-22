import { VXETableConfig } from '@/config'
import { $t } from '@/plugins/i18n'
import VXETable, { VxeUI } from 'vxe-table'

VxeUI.setConfig({
  i18n: (key, args) => $t(key, args),
})

/** 全局默认参数 */
VXETable.setConfig(VXETableConfig)

export { VXETable }
export default VXETable
