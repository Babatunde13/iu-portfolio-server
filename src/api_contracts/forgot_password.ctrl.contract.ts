import { BaseReq, SuccessResponse, ErrorResponse } from './base_request.ctrl.contract'
import { IUSer } from '../models/users.models.server'
import AppError from '../shared/AppError'
import { validateEmail } from '../utils/validate_email.util'

export interface ClientReq {
   email: string
}

export interface Req extends BaseReq {
    body: ClientReq
    user: IUSer
}

export type Res = Promise<ErrorResponse | SuccessResponse<{}>>

export const validationConfig = (data: ClientReq) => {
    if (!validateEmail(data.email)) {
        return { error: new AppError('Invalid email') }
    }

    return {
        data: true
    }
}
