import { ReqWithParams, SuccessResponse, ErrorResponse } from './base_request.ctrl.contract'
import { PasswordClient } from '../models/passwords.model.client'

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

export type Req = ReqWithParams<ClientReq>
export type Res = Promise<ErrorResponse | SuccessResponse<ClientRes>>
