import request from '@/utils/request'

export function increaseZan (id, type) {
  return request({
    url: '/common/increaseZan',
    methods: 'get',
    params: { 'id': id, 'type': type }
  })
}
