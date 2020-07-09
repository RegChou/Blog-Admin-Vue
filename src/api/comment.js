import request from '@/utils/request'

export function fetchCommentLists (query) {
  return request({
    url: '/comments/v1/get',
    method: 'get',
    params: query
  })
}

export function fetchCommentList (query) {
  return request({
    url: '/comments/v1/list',
    method: 'get',
    params: query
  })
}

export function replyComment (data) {
  return request({
    url: '/comments/admin/v1/reply',
    method: 'post',
    data
  })
}

export function fetchComment (id) {
  return request({
    url: `/comments/v1/${id}`,
    method: 'get'
  })
}

export function updateComment (data) {
  return request({
    url: '/comments/v1/update',
    method: 'put',
    data
  })
}

export function deleteComment (id) {
  return request({
    url: `/comments/v1/${id}`,
    method: 'delete'
  })
}
