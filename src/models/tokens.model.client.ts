import { BaseModelClient } from './base.model.client'

export enum TokenTypes {
    ACCESS = 'access',
    REFRESH = 'refresh',
    RESET_PASSWORD = 'reset_password',
    VERIFY_EMAIL = 'verify_email'
}

export interface TokenClient extends BaseModelClient {
    _id: string
    type: TokenTypes
    blacklisted: boolean
    expires: Date | number | string
    user: string
    token: string
}
