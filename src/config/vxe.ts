import type { VxeGlobalConfig } from 'vxe-table'
import { $t } from '@/plugins/i18n'

export const VXETableConfig: VxeGlobalConfig = {
  size: null,
  zIndex: 999,
  version: 0,
  loadingText: null,
  table: {
    showHeader: true,
    showOverflow: 'tooltip',
    showHeaderOverflow: 'tooltip',
    autoResize: true,
    // stripe: false,
    border: 'inner',
    // round: false,
    emptyText: $t('result.empty'),
    rowConfig: {
      isHover: true,
      isCurrent: true,
      keyField: '_VXE_ID',
    },
    columnConfig: {
      resizable: false,
    },
    align: 'center',
    headerAlign: 'center',
  },
  pager: {
    // size: "medium",
    perfect: false,
    pageSize: 10,
    pagerCount: 7,
    pageSizes: [10, 20, 50],
    layouts: ['Total', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump'],
  },
  modal: {
    minWidth: 500,
    minHeight: 400,
    lockView: true,
    mask: true,
    // duration: 3000,
    // marginSize: 20,
    dblclickZoom: false,
    showTitleOverflow: true,
    transfer: true,
    draggable: false,
  },
} as VxeGlobalConfig
