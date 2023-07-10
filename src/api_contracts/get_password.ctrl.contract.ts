import { isValidObjectId } from 'mongoose'
import { ReqWithParams, SuccessResponse, ErrorResponse } from './base_request.ctrl.contract'
import { PasswordClient } from '../models/passwords.model.client'
import { IUSer } from '../models/users.models.server'
import AppError from '../shared/AppError'

export interface ClientReq {
    params: {
        id: string
    }
    user: IUSer
}

export type ClientRes = PasswordClient

export type Req = ReqWithParams<ClientReq>
export type Res = Promise<ErrorResponse | SuccessResponse<ClientRes>>

export const validationConfig = (data: { id: string }) => {
    if (!isValidObjectId(data.id)) {
        return { error: new AppError('Invalid password id') }
    }

    return {
        data: true
    }
}
