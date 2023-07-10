import { BaseReq, SuccessResponse, ErrorResponse } from './base_request.ctrl.contract'
import { IUSer } from '../models/users.models.server'
import AppError from '../shared/AppError'
import { validatePassword } from '../utils/validate_password.util'

export interface ClientReq {
   token: string
   password: string
}

export interface Req extends BaseReq {
    body: ClientReq
    user: IUSer
}

export type Res = Promise<ErrorResponse | SuccessResponse<{}>>

export const validationConfig = (data: ClientReq) => {
    if (!validatePassword(data.password)) {
        return { error: new AppError('Invalid password') }
    }
    if (typeof data.token !== 'string') {
        return { error: new AppError('Invalid token') }
    }

    return {
        data: true
    }
}
