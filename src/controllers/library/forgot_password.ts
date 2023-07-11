import isError from '../../utils/is_error.utils'
import AppError from '../../shared/AppError'
import userModel from '../../models/users.models.server'
import { encodeUser } from '../../utils/jwt.utils'
import { TokenTypes } from '../../models/tokens.model.client'
import tokenModel from '../../models/tokens.model.server'
import { forgotPasswordMail } from '../../email_templates/forgot_password.templates'
import envs from '../../envs'
import { sendMail } from '../../utils/send_mail.utils'

export const forgotPassword = async (email: string) => {
    const findUserResult = await userModel.findOne({ email })
    if (isError(findUserResult) || !findUserResult.data) {
        return { error: new AppError('Not found') }
    }

    const expires = Date.now() + 1000 * 60 * 60 * 7
    const tokenResult = encodeUser(findUserResult.data._id, expires, TokenTypes.RESET_PASSWORD)
    if (isError(tokenResult) || !tokenResult.data) {
        return { error: new AppError('Something went wrong') }
    }

    await tokenModel.createAndSave({
        token: tokenResult.data, user: findUserResult.data._id,
        expires, blacklisted: false, type: TokenTypes.RESET_PASSWORD
    })

    const name = `${findUserResult.data.firstName} ${findUserResult.data.lastName}`
    const url = `${envs.app_url}/reset-password/${tokenResult.data}`

    const mailSubject = 'Reset Your StrongPass Password'

    sendMail(email, name, mailSubject, forgotPasswordMail({ name, url }))

    return { data: 'successfully sent password reset email' }
}
