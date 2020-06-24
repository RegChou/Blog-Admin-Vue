import request from '@/utils/request'

export function fetchTagsList (query) {
  return request({
    url: '/tags/tags/v1/list',
    method: 'get',
    params: query
  })
}
