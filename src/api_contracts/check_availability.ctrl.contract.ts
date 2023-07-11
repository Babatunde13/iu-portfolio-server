import { BaseReq, SuccessResponse, ErrorResponse } from './base_request.ctrl.contract'
import AppError from '../shared/AppError'
import { validateEmail } from '../utils/validate_email.util'

export interface ClientReq {
    email?: string
    username?: string
}

export type ClientRes = {}

export interface Req extends BaseReq {
    body: ClientReq
}

export type Res = Promise<ErrorResponse | SuccessResponse<ClientRes>>

export const validationConfig = (data: ClientReq) => {
    if (!data.email && !data.username) {
        return { error: new AppError('One of email or password should be provided.')}
    }
    if (data.email && !validateEmail(data.email)) {
        return { error: new AppError('Invalid email') }
    }

    if (data.username && typeof data.username !== 'string') {
        return { error: new AppError('Invalid username') }
    }

    return {
        data: true
    }
}
