import request from '@/utils/request'

/**
 * 分页查询故事
 * @param index
 * @param size
 */
export function getStoryList (index, size) {
  return request({
    url: '/story/storyList/' + index + '/' + size,
    method: 'get'
  })
}

/**
 * 精彩故事推荐
 */
export function getSplendidStory () {
  return request({
    url: '/story/splendidStory/inHome',
    method: 'get'
  })
}

export function getStoryById (id) {
  return request({
    url: '/story/showStory/' + id,
    method: 'get'
  })
}
