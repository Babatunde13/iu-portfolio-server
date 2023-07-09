import { ReqWithParams, SuccessResponse, ErrorResponse } from './base_request.ctrl.contract'
import { PasswordClient } from '../models/passwords.model.client'
import { IUSer } from 'src/models/users.models.server'

export interface ClientReq {
    param: {
        id: string
    }
    user: IUSer
}

export type ClientRes = PasswordClient

export type Req = ReqWithParams<ClientReq>
export type Res = Promise<ErrorResponse | SuccessResponse<ClientRes>>
