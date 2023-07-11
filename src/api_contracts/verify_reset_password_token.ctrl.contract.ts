import { BaseReq, SuccessResponse, ErrorResponse } from './base_request.ctrl.contract'
import { IUSer } from '../models/users.models.server'
import AppError from '../shared/AppError'

export interface ClientReq {
   token: string
}

export interface Req extends BaseReq {
    body: ClientReq
    user: IUSer
}

export type Res = Promise<ErrorResponse | SuccessResponse<{}>>

export const validationConfig = (data: ClientReq) => {
    if (typeof data.token !== 'string') {
        return { error: new AppError('Invalid token') }
    }

    return {
        data: true
    }
}
