import { isValidObjectId } from 'mongoose'
import { BaseReq, SuccessResponse, ErrorResponse } from './base_request.ctrl.contract'
import { PasswordClient } from '../models/passwords.model.client'
import { IUSer } from '../models/users.models.server'
import AppError from '../shared/AppError'

export interface ClientReq {
    _id: string
    username?: string
    website?: string
    account_name?: string
    category?: string
    password?: string

}

export type ClientRes = PasswordClient

export interface Req extends BaseReq {
    body: ClientReq
    user: IUSer
}

export type Res = Promise<ErrorResponse | SuccessResponse<ClientRes>>

export const validationConfig = (data: ClientReq) => {
    if (!isValidObjectId(data._id)) {
        return { error: new AppError('Invalid id') }
    }
    if (data.username && typeof data.username !== 'string') {
        return { error: new AppError('Invalid username') }
    }

    if (data.website && typeof data.website !== 'string' ) {
        return { error: new AppError('Invalid website') }
    }

    if (data.account_name && typeof data.account_name !== 'string') {
        return { error: new AppError('Invalid account name') }
    }

    if (data.category && !isValidObjectId(data.category)) {
        return { error: new AppError('Invalid category id') }
    }

    if (data.password && typeof data.password !== 'string') {
        return { error: new AppError('Invalid password') }
    }

    return {
        data: true
    }
}
