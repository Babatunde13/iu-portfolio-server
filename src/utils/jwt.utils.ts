import jwt from 'jsonwebtoken'
import AppError from '../shared/AppError'
import envs from '../envs'
import { TokenTypes } from '../models/tokens.model.client'

export const encodeUser = (userId: string, exp?: number, token_type?: TokenTypes) => {
    try {
        const token = jwt.sign(
            { sub: userId.toString(), exp: exp || Date.now() + (1000 * 60 * 60), iat: Date.now(), token_type },
            envs.secrets.jwt
        )
        return {
            data: token
        }
    } catch (e) {
        return {
            error: new AppError((e as Error).message, 'invalid_encoding')
        }
    }
}

export const decodeUser = (token: string) => {
    try {
        const verify = jwt.verify(token, envs.secrets.jwt)
        if (verify.exp && verify.exp < Date.now()) {
            throw new AppError('Token Expired', 'expired_token')
        }
        return {
            data: verify.sub
        }
    } catch (e) {
        return {
            error: new AppError((e as Error).message, 'invalid_decoding')
        }
    }
}
