import { ReqWithParams, SuccessResponse, ErrorResponse } from './base_request.ctrl.contract'
import { UserClient } from '../models/users.model.client'

export interface ClientReq {
    query: {
        limit: string
    }
}

export type ClientRes = UserClient[]

export type Req = ReqWithParams<ClientReq>
export type Res = Promise<ErrorResponse | SuccessResponse<ClientRes>>
