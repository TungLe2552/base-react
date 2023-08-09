export interface User {
  id: string | number
  name: string
  email: string
  role: ROLE
  avatar: string
}
export enum ROLE {
  sysadmin = 'sysadmin'
}
export interface ApiReturn<T> {
  message: string
  data: T[]
  paginate: Paginate
}
export interface Paginate {
  itemsPerPage: number
  page?: number
  total_pages?: number
  totalPages: number
}
export type Notification = {
  countNotificationQuestion: number
}
