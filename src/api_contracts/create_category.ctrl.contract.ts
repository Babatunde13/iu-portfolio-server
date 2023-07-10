import { BaseReq, SuccessResponse, ErrorResponse } from './base_request.ctrl.contract'
import { IUSer } from '../models/users.models.server'
import { CategoryClient } from '../models/categories.model.client'
import AppError from '../shared/AppError'

export interface ClientReq {
    name: string
}

export type ClientRes = CategoryClient

export interface Req extends BaseReq {
    body: ClientReq
    user: IUSer
}

export type Res = Promise<ErrorResponse | SuccessResponse<ClientRes>>

export const validationConfig = (data: ClientReq) => {
    if (typeof data.name !== 'string') {
        return { error: new AppError('Invalid category name') }
    }

    return {
        data: true
    }
}
