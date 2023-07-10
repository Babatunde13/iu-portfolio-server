import { Req, Res, validationConfig } from '../api_contracts/logout.ctrl.contract'
import isError from '../utils/is_error.utils'
import { logout } from './library/logout'

/**
 * Logs out
 */
export default async function logoutCtrl (req: Req): Res {
    const { refreshToken } = req.body
    const validateData = validationConfig({ refreshToken })
    if (isError(validateData) || !validateData.data) {
        return {
            success: false,
            message: validateData.error?.message || 'Invalid data',
            options: {
                status: 400
            }
        }
    }

    const logoutResult = await logout(refreshToken)
    if (isError(logoutResult) || !logoutResult.data) {
        return {
            success: false,
            message: logoutResult.error?.message || 'Something went wrong',
            options: {
                status: 400
            }
        }
    }

    return {
        message: 'Logout successfully',
        success: true,
        data: {}
    }
}
