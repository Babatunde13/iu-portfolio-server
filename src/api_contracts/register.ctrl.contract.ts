import { BaseReq, SuccessResponse, ErrorResponse } from './base_request.ctrl.contract'
import { UserClient } from '../models/users.model.client'
import { validateEmail } from '../utils/validate_email.util'
import { validatePassword } from '../utils/validate_password.util'
import AppError from '../shared/AppError'

export interface ClientReq {
    email: string
    name: string
    password: string
    username: string
}

export type ClientRes = {
    tokens: {
        access: {
            token: string
            expires: Date
        },
        refresh: {
            token: string
            expires: Date
        }
    }
    user: UserClient
}

export interface Req extends BaseReq {
    body: ClientReq
}

export type Res = Promise<ErrorResponse | SuccessResponse<ClientRes>>

export const validationConfig = (data: ClientReq) => {
    if (!validateEmail(data.email)) {
        return { error: new AppError('Invalid email') }
    }

    if (!validatePassword(data.password)) {
        return { error: new AppError('Invalid password') }
    }

    if (typeof data.name !== 'string' || data.name.split(' ').length < 2) {
        return { error: new AppError('Invalid name') }
    }

    if (typeof data.username !== 'string' || data.username.includes(' ')) {
        return { error: new AppError('Invalid username') }
    }

    return {
        data: true
    }
}
