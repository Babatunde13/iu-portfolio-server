import isError from '../../utils/is_error.utils'
import { TokenTypes } from '../../models/tokens.model.client'
import tokenModel from '../../models/tokens.model.server'
import AppError from '../../shared/AppError'
import { decodeUser } from '../../utils/jwt.utils'
import userModel from '../../models/users.models.server'

export const resetPassword = async (token: string, password: string) => {
    const { data, error } = decodeUser(token)
    if (isError(error) || !data) {
        return { error: new AppError('Not found') }
    }
    const findUserResult = await userModel.findOne({ _id: data })
    if (isError(findUserResult) || !findUserResult.data) {
        return { error: new AppError('Not found') }
    }
    const findTokenResult = await tokenModel.findOne({
        token,
        type: TokenTypes.RESET_PASSWORD,
        blacklisted: false,
    })
    if (isError(findTokenResult) || !findTokenResult.data) {
        return { error: new AppError('Not found') }
    }

    await userModel.updateOne({ email: findUserResult.data.email }, { $set: { password }})
    await tokenModel.deleteOne({ _id: findTokenResult.data._id })
    
    return { data: 'reset password successful' }
}
