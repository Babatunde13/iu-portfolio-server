import { BaseModelClient } from './base.model.client'

export interface PasswordClient extends BaseModelClient {
    _id: string
    user: string
    website: string
    account_name?: string
    category?: string
    password: string
    username: string
}