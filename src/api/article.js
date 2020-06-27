import request from '@/utils/request'

export function fetchList (query) {
  return request({
    url: 'article/v1/list',
    method: 'get',
    params: query
  })
}

export function createArticle (data) {
  return request({
    url: '/article/v1/add',
    method: 'post',
    data
  })
}

export function updateArticle (data) {
  return request({
    url: '/article/v1/update',
    method: 'put',
    data
  })
}

export function fetchArticle (id) {
  return request({
    url: `/article/v1/${id}`,
    method: 'get'
  })
}

export function deleteArticle (id) {
  return request({
    url: `/article/v1/delete/${id}`,
    method: 'delete'
  })
}

export function updateArticleStatus (data) {
  return request({
    url: '/article/status/v1/update',
    method: 'put',
    data
  })
}
