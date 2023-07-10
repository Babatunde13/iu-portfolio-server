import { Req, Res, validationConfig } from '../api_contracts/refresh_token.ctrl.contract'
import isError from '../utils/is_error.utils'
import { refreshAuthToken } from './library/refresh_auth_token'

/**
 * Refresh User Auth Tokens
 */
export default async function refreshToken (req: Req): Res {
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
        message: 'Successfully refreshed tokens',
        success: true,
        data: refreshTokenResult.data
    }
}
