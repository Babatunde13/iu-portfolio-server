import { Req, Res, validationConfig } from '../api_contracts/forgot_password.ctrl.contract'
import isError from '../utils/is_error.utils'
import { forgotPassword } from './library/forgot_password'

/**
 * Send email to reset password
 */
export default async function forgotPasswordCtrl (req: Req): Res {
    const { email } = req.body
    const validateData = validationConfig({ email })
    if (isError(validateData) || !validateData.data) {
        return {
            success: false,
            message: validateData.error?.message || 'Invalid data',
            options: {
                status: 400
            }
        }
    }

    const forgotPasswordResult = await forgotPassword(email)
    if (isError(forgotPasswordResult) || !forgotPasswordResult.data) {
        return {
            success: false,
            message: forgotPasswordResult.error?.message || 'Something went wrong',
            options: {
                status: 400
            }
        }
    }

    return {
        message: 'Reset password mail sent successfully',
        success: true,
        data: {}
    }
}
