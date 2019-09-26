import request from '@/utils/request'

export function logout () {
  return request({
	    url: '/api/logout.json',
	    method: 'post',
  })
}
