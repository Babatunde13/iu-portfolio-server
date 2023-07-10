import { ReqWithParams, SuccessResponse, ErrorResponse } from './base_request.ctrl.contract'
import { CategoryClient } from '../models/categories.model.client'

export interface ClientReq {
    query: {
        name: string
    }
}

export interface ClientRes {
    data: CategoryClient[]
}

export type Req = ReqWithParams<ClientReq>
export type Res = Promise<ErrorResponse | SuccessResponse<ClientRes>>
