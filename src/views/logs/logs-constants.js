// 表格列信息
const table = {
  columns: [
    {
      title: 'ID',
      align: 'center',
      dataIndex: 'id'
    },
    {
      title: '用户ID',
      align: 'center',
      dataIndex: 'userId'
    },
    {
      title: '日志类型',
      align: 'center',
      dataIndex: 'codeName'
    },
    {
      title: 'ip地址',
      align: 'center',
      dataIndex: 'ip'
    },
    {
      title: '请求URL',
      align: 'center',
      dataIndex: 'url',
      scopedSlots: { customRender: 'url' }
    },
    {
      title: '请求参数',
      align: 'center',
      dataIndex: 'parameter',
      scopedSlots: { customRender: 'parameter' }
    },
    {
      title: '设备',
      align: 'center',
      dataIndex: 'device'
    },
    {
      title: '执行时间',
      align: 'center',
      dataIndex: 'runTime'
    },
    {
      title: '创建时间',
      align: 'center',
      dataIndex: 'createTime',
      scopedSlots: { customRender: 'createTime' }
    },
    {
      title: '浏览器名称',
      align: 'center',
      dataIndex: 'browserName'
    },
    {
      title: '浏览器版本号',
      align: 'center',
      dataIndex: 'browserVersion'
    }
  ]
}

// 表格里面的列key value
const filters = {
  statusFilter (status) {
    const statusMap = {
      1: '草稿箱',
      2: '已发布'
    }
    return statusMap[status]
  },
  statusTypeFilter (status) {
    const statusMap = {
      1: 'error',
      2: 'success'
    }
    return statusMap[status]
  }
}

export { table, filters }
