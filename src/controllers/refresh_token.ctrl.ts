import { Req, Res } from '../api_contracts/refresh_token.ctrl.contract'
import isError from '../utils/is_error.utils'
import { refreshAuthToken } from './library/refresh_auth_token'

/**
 * Refresh User Auth Tokens
 */
export default async function refreshToken (req: Req): Res {
    const { refreshToken } = req.body

    const refreshTokenResult = await refreshAuthToken(refreshToken)
    if (isError(refreshTokenResult) || !refreshTokenResult.data) {
        return {
            success: false,
            message: refreshTokenResult.error?.message || 'Something went wrong',
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
