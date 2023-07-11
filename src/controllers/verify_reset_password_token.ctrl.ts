import { Req, Res, validationConfig } from '../api_contracts/verify_reset_password_token.ctrl.contract'
import isError from '../utils/is_error.utils'
import { verifyResetPasswordToken } from './library/verify_reset_password_token'

/**
 * Verify The Reset Password Token
 */
export default async function verifyResetPasswordTokenCtrl (req: Req): Res {
    const { token } = req.body
    const validateData = validationConfig({ token })
    if (isError(validateData) || !validateData.data) {
        return {
            success: false,
            message: validateData.error?.message || 'Invalid data',
            options: {
                status: 400
            }
        }
    }

    const resetPasswordResult = await verifyResetPasswordToken(token)
    if (isError(resetPasswordResult) || !resetPasswordResult.data) {
        return {
            success: false,
            message: resetPasswordResult.error?.message || 'Something went wrong',
            options: {
                status: 400
            }
        }
    }

    return {
        message: 'Reset password token verified successfully',
        success: true,
        data: {}
    }
}
