import { BaseReq, SuccessResponse, ErrorResponse } from './base_request.ctrl.contract'
import { UserClient } from '../models/users.model.client'
import { validateEmail } from '../utils/validate_email.util'
import { validatePassword } from '../utils/validate_password.util'
import AppError from '../shared/AppError'

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

export const validationConfig = (data: ClientReq) => {
    try {
      validateEmail(data.email)
      validatePassword(data.password)
    } catch (error) {
      return { error: error as AppError }
    }
  
    if (!isValidName(data.name)) {
      return { error: new AppError('Invalid name') }
    }
  
    if (!isValidUsername(data.username)) {
      return { error: new AppError('Invalid username') }
    }
  
    return { data: true }
  }
  
  const isValidName = (name: unknown): boolean => {
    return typeof name === 'string' && name.split(' ').length >= 2
  }
  
  const isValidUsername = (username: unknown): boolean => {
    return typeof username === 'string' && !username.includes(' ')
  }
  
