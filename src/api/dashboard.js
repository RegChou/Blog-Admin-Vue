import request from '@/utils/request'

export function fetchBolgQuantityTotal (query) {
  return request({
    url: '/dashboard/blog-total/v1/quantity',
    method: 'get',
    params: query
  })
}

export function fetchByteBlogsList (query) {
  return request({
    url: '/dashboard/byte-blogs/v1/list',
    method: 'get',
    timeout: 500000,
    params: query
  })
}

export function fetchByteBlogsChatList (query) {
  return request({
    url: '/dashboard/byte-blogs-chat/v1/list',
    method: 'get',
    timeout: 500000,
    params: query
  })
}

export function getPostsStatistics (query) {
  return request({
    url: '/dashboard/post-statistics/v1/list',
    method: 'get',
    params: query
  })
}

export function getPostsRanking (query) {
  return request({
    url: '/dashboard/post-ranking/v1/list',
    method: 'get',
    params: query
  })
}

export function getCountPerson (query) {
  return request({
    url: '/dashboard/user/v1/count',
    method: 'get',
    params: query
  })
}
