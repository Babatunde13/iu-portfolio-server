import { BaseModelClient } from './base.model.client'

export interface CategoryClient extends BaseModelClient {
    _id: string
    name: string
    user: string
}
