<template>
  <page-header-wrapper title=" ">
    <a-card :bordered="false">
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
  import { filters, table } from './article-constants'
  import CreateArticleForm from './modules/CreateForm'
  import { fetchList } from '@/api/article'
  import { STable, Ellipsis } from '@/components'
  export default {
    name: 'ArticleList',
    components: {
      STable,
      Ellipsis,
      CreateArticleForm
    },
    filters: filters,
    data () {
      return {
        queryParam: {},
        loadData: parameter => {
          console.log('loadData.parameter', parameter)
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
      }
    }
  }
</script>

<style scoped>

</style>
