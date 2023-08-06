import { ReqWithParams, SuccessResponse, ErrorResponse } from './base_request.ctrl.contract'
import { PasswordClient } from '../models/passwords.model.client'
import { IUSer } from '../models/users.models.server'

export interface ClientReq {
    query: {
        page: number
        per_page: number
        url_filter: string
        category: string
    }
}

export interface ClientRes {
    data: PasswordClient[]
    pagination: {
        hasNextPage: boolean
        count: number
    }
}

export interface Req extends ReqWithParams<ClientReq> {
    user: IUSer
}

export type Res = Promise<ErrorResponse | SuccessResponse<ClientRes>>
