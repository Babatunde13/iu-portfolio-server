import { BaseReq, SuccessResponse, ErrorResponse } from './base_request.ctrl.contract'
import { UserClient } from '../models/users.model.client'

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
