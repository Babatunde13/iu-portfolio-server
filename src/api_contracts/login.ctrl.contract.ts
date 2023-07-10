import { BaseReq, SuccessResponse, ErrorResponse } from './base_request.ctrl.contract'
import { UserClient } from '../models/users.model.client'
import AppError from '../shared/AppError'
import { validateEmail } from '../utils/validate_email.util'
import { validatePassword } from '../utils/validate_password.util'

export interface ClientReq {
    email: string
    password: string
}

export type ClientRes = {
    user: UserClient
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

    return {
        data: true
    }
}
