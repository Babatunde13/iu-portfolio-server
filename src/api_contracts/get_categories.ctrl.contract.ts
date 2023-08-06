import { ReqWithParams, SuccessResponse, ErrorResponse } from './base_request.ctrl.contract'
import { CategoryClient } from '../models/categories.model.client'
import { IUSer } from '../models/users.models.server'

export interface ClientReq {
    query: {
        name: string
    }
}

export interface ClientRes {
    data: CategoryClient[]
}

export interface Req extends ReqWithParams<ClientReq> {
    user: IUSer
}
export type Res = Promise<ErrorResponse | SuccessResponse<ClientRes>>
