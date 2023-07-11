import isError from '../../utils/is_error.utils'
import { TokenTypes } from '../../models/tokens.model.client'
import tokenModel from '../../models/tokens.model.server'
import AppError from '../../shared/AppError'
import { decodeUser } from '../../utils/jwt.utils'
import userModel from '../../models/users.models.server'
import { hashPassword } from '../../utils/hash_password.utils'

export const resetPassword = async (token: string, password: string) => {
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

    const findUserResult = await userModel.findOne({ _id: decodeUserResult.data })
    if (isError(findUserResult) || !findUserResult.data) {
        return { error: new AppError('Not found') }
    }

    const hashPasswordResult = await hashPassword(password)
    if (isError(hashPasswordResult)) {
        return { error: new AppError('Could not hash password') }
    }

    await Promise.all([
        userModel.updateOne({ email: findUserResult.data.email }, { $set: { password: hashPasswordResult.data }}),
        tokenModel.deleteOne({ _id: findTokenResult.data._id })
    ])
    
    return { data: 'reset password successful' }
}
