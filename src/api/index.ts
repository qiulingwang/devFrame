import { post } from '@/utils/request'

export function fetchChatConfig<T = any>() {
  return post<T>({
    url: '/config',
  })
}

export function login<T>(data: {
  email: string
  password: string
  nickname?: string
}) {
  return post<T>({
    url: '登录API',
    data,
  })
}
