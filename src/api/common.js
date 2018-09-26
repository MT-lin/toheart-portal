import request from '@/utils/request'

export function increaseZan (id, type) {
  return request({
    url: '/common/increaseZan',
    methods: 'get',
    params: { 'id': id, 'type': type }
  })
}

export function increaseComment (id, type, fatherId, content) {
  return request({
    url: '/common/increaseComment',
    methods: 'get',
    params: { 'id': id, 'type': type, 'fatherId': fatherId, 'content': content }
  })
}

export function getComment (id, type) {
  return request({
    url: '/common/findComment',
    methods: 'get',
    params: { 'id': id, 'type': type }
  })
}
