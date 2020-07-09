<template>
  <div class="page-header-index-wide">
    <a-row :gutter="24">
      <a-col :sm="24" :md="12" :xl="8" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="文章数量" :total="quantityObject.articleTotal" v-if="quantityObject !== null">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <span>草稿箱  {{ quantityObject.draftTotal }}</span>
            <a-divider type="vertical" />
            <span>已发布 {{ quantityObject.publishTotal }}</span>
          </div>
          <template slot="footer">今日发布<span> {{ quantityObject.todayPublishTotal }}</span></template>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="8" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="用户数量" :total="countPerson.userCount" v-if="countPerson !== null">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-bar/>
          </div>
          <template slot="footer" >
            今日新增<span> {{ countPerson.toDayNew }}</span>
          </template>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="8" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="系统信息" :total="memoryInfo.usedRatio+ '%'" v-if="systemInfo !== null && memoryInfo !== null">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <a-progress :percent="memoryInfo.usedRatio" size="small" status="active" />
          </div>
          <template slot="footer">
            <a-tooltip placement="topLeft">
              <template slot="title">
                <span>内存 {{ memoryInfo.total }}GB</span>
              </template>
              内存 {{ memoryInfo.total }}GB
            </a-tooltip>
            <a-divider type="vertical" />
            <a-tooltip placement="topLeft">
              <template slot="title">
                <span>系统 {{ systemInfo.osName }}</span>
              </template>
              系统 {{ systemInfo.osName }}
            </a-tooltip>
            <a-divider type="vertical" />
            <a-tooltip placement="topLeft">
              <template slot="title">
                <span>JDK {{ systemInfo.javaVersion }}</span>
              </template>
              JDK {{ systemInfo.javaVersion }}
            </a-tooltip>
          </template>
        </chart-card>
      </a-col>
    </a-row>

  </div>
</template>

<script>
import { ChartCard, MiniArea, MiniBar, MiniProgress, RankList, Bar, Trend, NumberInfo, MiniSmoothArea, Ellipsis } from '@/components'
import { mixinDevice } from '@/utils/mixin'
import { fetchBolgQuantityTotal, getCountPerson } from '@/api/dashboard'
import { getSystem, getMemory } from '@/api/monitor'
import ViewChart from './ViewChart'

export default {
  name: 'Analysis',
  mixins: [mixinDevice],
  components: {
    ChartCard,
    MiniArea,
    MiniBar,
    MiniProgress,
    RankList,
    Bar,
    Trend,
    NumberInfo,
    MiniSmoothArea,
    Ellipsis,
    ViewChart
  },
  data () {
    return {
      loading: true,
      rankingData: null,
      countPerson: null,
      viewsChart: null,
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1
      },
      quantityObject: null,
      systemInfo: null,
      memoryInfo: null,
      viewRecords: null,
      xAxis: null
    }
  },
  created () {
    this.loadBolgQuantityTotal()
    this.getSystem()
    this.getMemory()
    this.getCountPerson()
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  },
  methods: {
    loadBolgQuantityTotal () {
      fetchBolgQuantityTotal().then(response => {
        this.quantityObject = response.data
      })
    },
    getSystem () {
      getSystem().then(response => {
        this.systemInfo = response.data
      })
    },
    getMemory () {
      getMemory().then(response => {
        this.memoryInfo = response.data
      })
    },
    getCountPerson () {
      getCountPerson().then(response => {
        this.countPerson = response.data
      })
    }
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
