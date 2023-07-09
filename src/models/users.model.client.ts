import { BaseModelClient } from './base.model.client'

export interface UserClient extends BaseModelClient {
    _id: string
    username: string
    firstName: string
    lastName: string
    email: string
    password?: string
}
