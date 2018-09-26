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

export function addConfession (data) {
  return request({
    url: '/confession/addConfession',
    method: 'get',
    params: data
  })
}

export function getConfessionById (id) {
  return request({
    url: '/confession/getConfession/' + id,
    method: 'get'
  })
}
