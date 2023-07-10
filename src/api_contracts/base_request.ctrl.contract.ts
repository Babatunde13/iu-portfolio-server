import { Request } from 'express'
import { IUSer } from '../models/users.models.server'

export type BaseReq = Request  & {
    params: { [key: string]: string | undefined }
    query: { [key: string]: string | undefined }
    user?: IUSer
}

export type ReqWithParams<T> = BaseReq & T

export type SuccessResponse<T = {}> =  {
	success: boolean
    message: string
	data: T
    isMiddleware?: boolean
    options?: {
        status?: number
        redirect?: string
        sendString?: boolean
    }
}

export interface ErrorResponse {
    success: boolean
    message: string
    isMiddleware?: boolean
    options?: {
        status: number
        redirect?: string
        sendString?: boolean
    }
}
export interface MiddlewareResponse {
    isMiddleware?: boolean
}

export type BaseRes= Promise<ErrorResponse | SuccessResponse<any> | MiddlewareResponse>
export type BaseMiddleware= Promise<ErrorResponse | MiddlewareResponse>
