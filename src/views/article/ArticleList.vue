<template>
  <page-header-wrapper title=" ">
    <a-card :bordered="false">
      <SearchForm ref="searchForm" @reloadData="reloadData"/>
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="createHandler">新建</a-button>
      </div>
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
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="summary" slot-scope="text">
          <ellipsis :length="10" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="createTime" slot-scope="text">
          {{ text | dayjs }}
        </span>
        <span slot="titles" slot-scope="text">
          <ellipsis :length="15" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <a v-if="record.status === 1" @click="handleModifyStatus(record,2)">发布</a>
            <a v-if="record.status === 2" @click="handleModifyStatus(record,1)">草稿箱</a>
            <a-divider type="vertical" />
            <a-popconfirm
              title="确定删除这篇文章？"
              @confirm="handleDelete(record)"
              @cancel="cancel"
              okText="Yes"
              cancelText="No"
            >
              <a href="#">删除</a>
            </a-popconfirm>
          </template>
        </span>
      </s-table>

      <CreateArticleForm
        :formType="formType"
        :visible="visible"
        ref="createArticleForm"
        @resetData="resetData"
        @refreshTable="refreshTable"
      />
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { fetchList, updateArticleStatus, deleteArticle } from '@/api/article'
import { STable, Ellipsis } from '@/components'
import CreateArticleForm from './modules/CreateForm'
import SearchForm from './modules/SearchForm'
import { filters, table } from './article-constants'
export default {
  name: 'ArticleList',
  components: {
    STable,
    Ellipsis,
    CreateArticleForm,
    SearchForm
  },
  filters: filters,
  data () {
    return {
      queryParam: {},
      loadData: parameter => {
        return fetchList(Object.assign(parameter, this.queryParam)).then(res => {
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
          onChange: this.handleSelectChange
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
      this.$refs.createArticleForm.resetForm()
    },
    handleEdit (record) {
      this.$refs.createArticleForm.handleEdit(record)
      this.formType = 'edit'
      this.visible = true
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
    handleModifyStatus (record, status) {
      updateArticleStatus({
        id: record.id,
        status: status
      }).then(res => {
        this.$notification.success({
          message: '更新状态成功'
        })
        this.$refs.table.refresh()
      })
    },
    handleDelete (row) {
      deleteArticle(row.id).then(res => {
        this.$notification.success({
          message: '删除成功'
        })
        this.$refs.table.refresh()
      })
    },
    cancel () {},
    handleSelectChange (value) {
    }
  }
}
</script>

<style scoped>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
