import request from '@/utils/request'

/**
 * 获取告白列表
 * @param index
 * @param size
 */
export function getConfessionList (index, size) {
  return request({
    url: '/confession/confessionList/' + index + '/' + size,
    method: 'get'
  })
}
export function getFavConfession () {
  return request({
    url: '/confession/splendidConfession/inHome',
    method: 'get'
  })
}
