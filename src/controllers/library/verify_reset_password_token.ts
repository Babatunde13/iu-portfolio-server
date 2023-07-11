import isError from '../../utils/is_error.utils'
import { TokenTypes } from '../../models/tokens.model.client'
import tokenModel from '../../models/tokens.model.server'
import AppError from '../../shared/AppError'
import { decodeUser } from '../../utils/jwt.utils'

export const verifyResetPasswordToken = async (token: string) => {
    const decodeUserResult = decodeUser(token)
    if (isError(decodeUserResult) || !decodeUserResult.data) {
        return { error: new AppError('Could not verify token') }
    }

    const findTokenResult = await tokenModel.findOne({
        token,
        type: TokenTypes.RESET_PASSWORD,
        blacklisted: false,
    })
    if (isError(findTokenResult) || !findTokenResult.data) {
        return { error: new AppError('Could not verify token') }
    }
    
    return { data: 'reset password token verified successful' }
}
