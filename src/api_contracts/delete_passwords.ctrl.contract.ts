import { IUSer } from 'src/models/users.models.server'
import { BaseReq, SuccessResponse, ErrorResponse } from './base_request.ctrl.contract'

export interface ClientReq {
   _ids: string[]

}

export interface Req extends BaseReq {
    body: ClientReq
    user: IUSer
}

export type Res = Promise<ErrorResponse | SuccessResponse<string>>
