<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="16">
          <a-col :lg="6" :md="4" :sm="4">
            <a-form-item label="标题">
              <a-input v-model="queryParam.title" placeholder="请输入标题"/>
            </a-form-item>
          </a-col>
          <a-col :lg="6" :md="4" :sm="4">
            <a-form-item label="文章状态">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">草稿箱</a-select-option>
                <a-select-option value="2">已发布</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :lg="6" :md="4" :sm="4">
            <a-form-item label="创建时间">
              <a-date-picker  @change="dateChange" style="width: 100%" placeholder="请选择日期"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="4">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="handlerSearch">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'SearchForm',
  props: {
  },
  components: {
  },
  data () {
    return {
      // 查询参数
      queryParam: {}
    }
  },
  methods: {
    handlerSearch () {
      this.$emit('reloadData', this.queryParam)
    },
    resetSearchForm () {
      this.queryParam = {
        createTime: moment(new Date())
      }
    },
    dateChange (date, dateString) {
      if (dateString !== '') {
        this.queryParam.createTime = new Date(dateString[0]).getTime()
      } else {
        this.queryParam.createTime = null
      }
    }
  },
  mounted () {
  }
}
</script>

<style scoped>

</style>
