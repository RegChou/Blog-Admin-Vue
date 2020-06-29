import request from '@/utils/request'

export function fetchMenuList (query) {
  return request({
    url: '/menu/v1/list',
    method: 'get',
    params: query
  })
}

export function fetchMenu (id) {
  return request({
    url: `/menu/v1/${id}`,
    method: 'get'
  })
}

export function createMenu (data) {
  return request({
    url: '/menu/v1/add',
    method: 'post',
    data
  })
}

export function updateMenu (data) {
  return request({
    url: '/menu/v1/update',
    method: 'put',
    data
  })
}

export function deleteMenu (id) {
  return request({
    url: `/menu/v1/${id}`,
    method: 'delete'
  })
}
