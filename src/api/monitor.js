import request from '@/utils/request'

export function getSystem (query) {
  return request({
    url: '/monitor/system/v1/get',
    method: 'get',
    params: query
  })
}

export function getMemory (query) {
  return request({
    url: '/monitor/memory/v1/get',
    method: 'get',
    params: query
  })
}
