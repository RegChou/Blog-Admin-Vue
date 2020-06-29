<template>
  <page-header-wrapper title=" ">
    <a-card :bordered="false">
      <SearchForm ref="searchForm" @reloadData="reloadData"/>
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :scroll="{ x: 1300 }"
        :columns="columns"
        :data="loadData"
        :alert="options.alert"
        :rowSelection="options.rowSelection"
        showPagination="true"
      >
        <span slot="url" slot-scope="text">
          <ellipsis :length="10" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="parameter" slot-scope="text">
          <ellipsis :length="10" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="url" slot-scope="text">
          <ellipsis :length="10" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="createTime" slot-scope="text">
          {{ text | dayjs }}
        </span>
      </s-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { fetchLogsList } from '@/api/logs'
import { STable, Ellipsis } from '@/components'
import SearchForm from './modules/SearchForm'
import { filters, table } from './logs-constants'
export default {
  name: 'LogsList',
  components: {
    STable,
    Ellipsis,
    SearchForm
  },
  filters: filters,
  data () {
    return {
      queryParam: {},
      loadData: parameter => {
        return fetchLogsList(Object.assign(parameter, this.queryParam)).then(res => {
          return res
        })
      },
      options: {
        alert: {
          show: true,
          clear: () => {
            this.selectedRowKeys = []
          }
        },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      columns: table.columns,
      visible: false,
      formType: 'create'
    }
  },
  created () {},
  methods: {
    createHandler () {
      this.formType = 'create'
      this.visible = true
      this.$refs.createUserForm.resetForm()
    },
    resetData (flag) {
      this.visible = flag
      this.record = null
    },
    refreshTable () {
      this.$refs.table.refresh()
    },
    reloadData (queryParam) {
      this.queryParam = queryParam
      this.refreshTable()
    },
    cancel () { }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
