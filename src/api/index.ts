import type { QueryType } from '@/views/HomeView.vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  baseURL: '/api'
})

request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (err) => {
    ElMessage.error(err.data.message)
    return Promise.reject(err)
  }
)

export type BookType = {
  id: number
  name: string
  author: string
  description: string
  cover: string
}
export type CreateBookType = Omit<BookType, 'id'>

export type LoginFormType = {
  username: string
  password: string
}

export const pageList = (params: QueryType) => {
  return request.get<QueryType, BookType[]>(`/book/list`, { params })
}

export const createBook = (data: CreateBookType) => {
  return request.post<CreateBookType, BookType>('/book/create', data)
}

export const updateBook = (data: BookType) => {
  return request.post<BookType, string>('/book/update', data)
}

export const findBook = (id: number) => {
  return request.get<number, BookType>(`/book/${id}`)
}

export const delBook = (id: number) => {
  return request.post<number, boolean>(`/book/delete/${id}`)
}

export const uploadCover = (data: FormData) => {
  return request.post<FormData, string>('/book/uploadFile', data)
}

export const login = (data: LoginFormType) => {
  return request.post<LoginFormType, string>('/user/login', data)
}

export const register = (data: LoginFormType) => {
  return request.post<LoginFormType, string>('/user/registry', data)
}
