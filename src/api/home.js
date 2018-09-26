import request from '@/utils/request'

export function getUser () {
  return request({
    url: '/user',
    methods: 'get'
  })
}
export function logout () {
  return request({
    url: '/logout',
    methods: 'get'
  })
}
