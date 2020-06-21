<template>
  <div>
    <a-row :gutter="24">
      <a-row :gutter="24">
        <a-col :sm="24" :md="12" :xl="8" :style="{ marginBottom: '24px' }">
          <chart-card :loading="loading" title="文章数量" :total="哈哈"  >
            <a-tooltip title="指标说明" slot="action">
              <a-icon type="info-circle-o" />
            </a-tooltip>
            <div>
              <span>草稿箱  1</span>
              <a-divider type="vertical" />
              <span>已发布 2</span>
              <a-divider type="vertical" />
              <span>已同步 3</span>
            </div>
            <template slot="footer">今日发布<span> 4 </span></template>
          </chart-card>
        </a-col>
        <a-col :sm="24" :md="12" :xl="8" :style="{ marginBottom: '24px' }">
          <chart-card :loading="loading" title="同步文章效果" :total="1" >
            <a-tooltip title="指标说明" slot="action">
              <a-icon type="info-circle-o" />
            </a-tooltip>
            <div>
              <mini-bar/>
            </div>
            <template slot="footer" >
              文章 <span>5</span>
              <a-divider type="vertical" />
              点赞 <span>6</span>
              <a-divider type="vertical" />
              评论 <span>7</span>
            </template>
          </chart-card>
        </a-col>
        <a-col :sm="24" :md="12" :xl="8" :style="{ marginBottom: '24px' }">
          <chart-card :loading="loading" title="系统信息" :total="haha">
            <a-tooltip title="指标说明" slot="action">
              <a-icon type="info-circle-o" />
            </a-tooltip>
            <div>
              <a-progress :percent="mem" size="small" status="active" />
            </div>
            <template slot="footer">
              <a-tooltip placement="topLeft">
                <template slot="title">
                  <span>内存 11GB</span>
                </template>
                内存 22GB
              </a-tooltip>
              <a-divider type="vertical" />
              <a-tooltip placement="topLeft">
                <template slot="title">
                  <span>系统 33</span>
                </template>
                系统 44
              </a-tooltip>
              <a-divider type="vertical" />
              <a-tooltip placement="topLeft">
                <template slot="title">
                  <span>JDK 55</span>
                </template>
                JDK 66
              </a-tooltip>
            </template>
          </chart-card>
        </a-col>
      </a-row>
    </a-row>

    <a-card :loading="loading" :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
          <div class="extra-wrapper" slot="tabBarExtraContent">
            <div class="extra-item">
              <a>今日</a>
              <a>本周</a>
              <a>本月</a>
              <a>本年</a>
            </div>
            <a-range-picker :style="{width: '256px'}" />
          </div>
          <a-tab-pane tab="访问量" key="1">
            <a-row>
              <a-col :xl="14" :lg="10" :md="12" :sm="24" :xs="24">
                <ViewChart ref="viewChart" :videoRecords="viewRecords"></ViewChart>
              </a-col>
              <a-col :xl="10" :lg="12" :md="12" :sm="24" :xs="24">
                <div class="ant-table-wrapper">
                  <a-table
                    row-key="index"
                    size="small"
                    :columns="rankingTableColumns"
                    :dataSource="rankingData"
                    :pagination="{ pageSize: 8 }"
                  >
                  </a-table>
                </div>
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import {
  ChartCard,
  MiniArea,
  MiniBar,
  MiniProgress,
  RankList,
  Bar,
  Trend,
  NumberInfo,
  MiniSmoothArea
} from '@/components'
import { baseMixin } from '@/store/app-mixin'

// eslint-disable-next-line no-unused-vars
const rankingTableColumns = [
  {
    dataIndex: 'index',
    title: '排名',
    width: 90
  },
  {
    dataIndex: 'title',
    title: '文章标题'
  },
  {
    dataIndex: 'viewTotal',
    title: '访问量'
  },
  {
    dataIndex: 'userTotal',
    title: '用户数'
  }
]

const barData = []
const barData2 = []
for (let i = 0; i < 12; i += 1) {
  barData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200
  })
  barData2.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200
  })
}

const rankList = []
for (let i = 0; i < 7; i++) {
  rankList.push({
    name: '白鹭岛 ' + (i + 1) + ' 号店',
    total: 1234.56 - i * 100
  })
}

const searchUserData = []
for (let i = 0; i < 7; i++) {
  searchUserData.push({
    x: moment().add(i, 'days').format('YYYY-MM-DD'),
    y: Math.ceil(Math.random() * 10)
  })
}
const searchUserScale = [
  {
    dataKey: 'x',
    alias: '时间'
  },
  {
    dataKey: 'y',
    alias: '用户数',
    min: 0,
    max: 10
  }]

const searchTableColumns = [
  {
    dataIndex: 'index',
    title: '排名',
    width: 90
  },
  {
    dataIndex: 'keyword',
    title: '搜索关键词'
  },
  {
    dataIndex: 'count',
    title: '用户数'
  },
  {
    dataIndex: 'range',
    title: '周涨幅',
    align: 'right',
    sorter: (a, b) => a.range - b.range,
    scopedSlots: { customRender: 'range' }
  }
]
const searchData = []
for (let i = 0; i < 50; i += 1) {
  searchData.push({
    index: i + 1,
    keyword: `搜索关键词-${i}`,
    count: Math.floor(Math.random() * 1000),
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2)
  })
}

const DataSet = require('@antv/data-set')

const sourceData = [
  { item: '家用电器', count: 32.2 },
  { item: '食用酒水', count: 21 },
  { item: '个护健康', count: 17 },
  { item: '服饰箱包', count: 13 },
  { item: '母婴产品', count: 9 },
  { item: '其他', count: 7.8 }
]

const pieScale = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.0%'
}]

const dv = new DataSet.View().source(sourceData)
dv.transform({
  type: 'percent',
  field: 'count',
  dimension: 'item',
  as: 'percent'
})
const pieData = dv.rows

export default {
  name: 'Analysis',
  mixins: [baseMixin],
  components: {
    ChartCard,
    MiniArea,
    MiniBar,
    MiniProgress,
    RankList,
    Bar,
    Trend,
    NumberInfo,
    MiniSmoothArea
  },
  data () {
    return {
      loading: true,
      rankList,

      // 搜索用户数
      searchUserData,
      searchUserScale,
      searchTableColumns,
      searchData,

      barData,
      barData2,

      //
      pieScale,
      pieData,
      sourceData,
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1
      }
    }
  },
  created () {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  }
}
</script>

<style lang="less" scoped>
  .extra-wrapper {
    line-height: 55px;
    padding-right: 24px;

    .extra-item {
      display: inline-block;
      margin-right: 24px;

      a {
        margin-left: 24px;
      }
    }
  }

  .antd-pro-pages-dashboard-analysis-twoColLayout {
    position: relative;
    display: flex;
    display: block;
    flex-flow: row wrap;
  }

  .antd-pro-pages-dashboard-analysis-salesCard {
    height: calc(100% - 24px);
    /deep/ .ant-card-head {
      position: relative;
    }
  }

  .dashboard-analysis-iconGroup {
    i {
      margin-left: 16px;
      color: rgba(0,0,0,.45);
      cursor: pointer;
      transition: color .32s;
      color: black;
    }
  }
  .analysis-salesTypeRadio {
    position: absolute;
    right: 54px;
    bottom: 12px;
  }
</style>
