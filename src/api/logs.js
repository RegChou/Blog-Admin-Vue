import request from '@/utils/request'

export function fetchLogsList (query) {
  return request({
    url: '/logs/v1/list',
    method: 'get',
    params: query
  })
}
