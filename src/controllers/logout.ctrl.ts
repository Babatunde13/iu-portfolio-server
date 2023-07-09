import { Req, Res } from '../api_contracts/logout.ctrl.contract'
import isError from '../utils/is_error.utils'
import { logout } from './library/logout'

/**
 * Logs out
 */
export default async function logoutCtrl (req: Req): Res {
    const { refreshToken } = req.body

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
        message: 'Registered successfully',
        success: true,
        data: {}
    }
}
