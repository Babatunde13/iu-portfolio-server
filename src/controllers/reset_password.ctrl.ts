import { Req, Res, validationConfig } from '../api_contracts/reset_password.ctrl.contract'
import isError from '../utils/is_error.utils'
import { resetPassword } from './library/reset_password'

/**
 * Reset user password
 */
export default async function resetPasswordCtrl (req: Req): Res {
    const { token, password } = req.body
    const validateData = validationConfig({ token, password })
    if (isError(validateData) || !validateData.data) {
        return {
            success: false,
            message: validateData.error?.message || 'Invalid data',
            options: {
                status: 400
            }
        }
    }

    const resetPasswordResult = await resetPassword(token, password)
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
        message: 'Reset password successfully',
        success: true,
        data: {}
    }
}
