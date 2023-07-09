import { BaseModelClient } from './base.model.client'

export interface PasswordClient extends BaseModelClient {
    _id: string
    url: string
    user: string
    password: string
    username: string
}