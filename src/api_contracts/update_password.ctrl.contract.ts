import { BaseReq, SuccessResponse, ErrorResponse } from './base_request.ctrl.contract'
import { PasswordClient } from '../models/passwords.model.client'
import { IUSer } from 'src/models/users.models.server'

export interface ClientReq {
    _id: string
    username?: string
    url?: string
    password?: string

}

export type ClientRes = PasswordClient

export interface Req extends BaseReq {
    body: ClientReq
    user: IUSer
}

export type Res = Promise<ErrorResponse | SuccessResponse<ClientRes>>
