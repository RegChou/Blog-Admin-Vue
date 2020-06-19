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
