import { TokenTypes } from '../../models/tokens.model.client'
import tokenModel from '../../models/tokens.model.server'
import userModel from '../../models/users.models.server'
import AppError from '../../shared/AppError'
import isError from '../../utils/is_error.utils'
import { generateAuthTokens } from './generate_auth_tokens'

export const refreshAuthToken = async (refreshToken: string) => {
    const refreshTokenDoc = await tokenModel.findOne({
        token: refreshToken,
        type: TokenTypes.REFRESH
    })
    if (isError(refreshTokenDoc) || !refreshTokenDoc.data) {
        return { error: new AppError('Invalid refresh token') }
    }
    const findUserResult = await userModel.findById(refreshTokenDoc.data.user)
    if (isError(findUserResult) || !findUserResult.data) {
        return { error: new AppError('Invalid refresh token') }
    }
    await tokenModel.deleteOne({
        token: refreshToken,
        type: TokenTypes.REFRESH
    })
    const tokens = await generateAuthTokens(findUserResult.data)

    return tokens
}
