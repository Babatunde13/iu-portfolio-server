import { BaseReq, SuccessResponse, ErrorResponse } from './base_request.ctrl.contract'
import { IUSer } from '../models/users.models.server'
import AppError from '../shared/AppError'

export interface ClientReq {
   refreshToken: string

}

export interface ClientRes {
    access: {
        token: string
        expires: Date
    },
    refresh: {
        token: string
        expires: Date
    }
}

export interface Req extends BaseReq {
    body: ClientReq
    user: IUSer
}

export type Res = Promise<ErrorResponse | SuccessResponse<{}>>

export const validationConfig = (data: ClientReq) => {
    if (typeof data.refreshToken !== 'string') {
        return { error: new AppError('Invalid refresh token') }
    }

    return {
        data: true
    }
}
