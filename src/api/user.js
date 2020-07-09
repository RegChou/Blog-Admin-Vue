import request from '@/utils/request'

export function updateStatus (data) {
  return request({
    url: '/auth/status/v1/update',
    method: 'put',
    data
  })
}

export function updateUser (data) {
  return request({
    url: '/auth/admin/v1/update',
    method: 'put',
    data
  })
}

export function updatePassword (data) {
  return request({
    url: '/auth/password/v1/update',
    method: 'put',
    data
  })
}

export function getUserList (query) {
  return request({
    url: '/auth/user/v1/list',
    method: 'get',
    params: query
  })
}

export function getOauthLoginByGithub (params) {
  return request({
    url: '/auth/github/v1/get',
    method: 'get',
    params
  })
}

export function deleteUser (id) {
  return request({
    url: `/auth/user/v1/${id}`,
    method: 'delete'
  })
}
