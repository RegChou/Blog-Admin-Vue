import request from '@/utils/request'

export function login (parameter) {
  return request({
    url: '/auth/admin/v1/login',
    method: 'post',
    data: parameter
  })
}
export function register (parameter) {
  return request({
    url: '/auth/admin/v1/register',
    method: 'post',
    data: parameter
  })
}

export function getSmsCaptcha (parameter) {
  return request({
    url: '/auth/admin/v1/email',
    method: 'post',
    data: parameter
  })
}

export function logout () {
  return request({
    url: '/auth/v1/logout',
    method: 'post'
  })
}

export function getInfo (token) {
  return request({
    url: '/auth/user/v1/get',
    method: 'get',
    headers: {
      'Authorization': token
    }
  })
}

export function socialLogin (parameter) {
  return request({
    url: '/auth/admin/v1/login',
    method: 'post',
    data: parameter
  })
}
