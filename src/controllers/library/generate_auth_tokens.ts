import isError from '../../utils/is_error.utils'
import { IUSer } from '../../models/users.models.server'
import { encodeUser } from '../../utils/jwt.utils'
import AppError from '../../shared/AppError'
import tokenModel from '../../models/tokens.model.server'
import { TokenTypes } from '../../models/tokens.model.client'

const saveToken = async (token: string, user: string, type: TokenTypes, expires: number, blacklisted = false) => {
    await tokenModel.createAndSave({
        token, user, expires, blacklisted, type
    })
}

export const generateAuthTokens = async (user: IUSer) => {
    const accessTokenExpires = Date.now() + 1000 * 60 * 30 // expire after 30 mins
    const accessToken = encodeUser(user._id, Date.now() + 1000 * 60 * 30, TokenTypes.ACCESS)
    if (isError(accessToken) || !accessToken.data) {
        return {
            error: new AppError('Could not generate auth tokens', 'encoding')
        }
    }

    await saveToken(accessToken.data, user._id, TokenTypes.ACCESS, accessTokenExpires)

    const refreshTokenExpires = Date.now() + 1000 * 60 * 60 * 24 // expire after 30 mins
    const refreshToken = encodeUser(user._id, refreshTokenExpires, TokenTypes.REFRESH)
    if (isError(refreshToken) || !refreshToken.data) {
        return {
            error: new AppError('Could not generate auth tokens', 'encoding')
        }
    }

    await saveToken(refreshToken.data, user._id, TokenTypes.REFRESH, refreshTokenExpires)

    return {
        data: {
            access: {
                token: accessToken.data,
                expires: new Date(accessTokenExpires),
            },
            refresh: {
                token: refreshToken.data,
                expires: new Date(refreshTokenExpires),
            }
        }
    }
}