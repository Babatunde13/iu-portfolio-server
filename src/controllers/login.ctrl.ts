import { Req, Res, validationConfig } from '../api_contracts/login.ctrl.contract'
import isError from '../utils/is_error.utils'
import usersModel from '../models/users.models.server'
import { verifyPassword } from '../utils/verify_password_hash.utils'
import { generateAuthTokens } from './library/generate_auth_tokens'

/**
 * Login
 */
export default async function loginCtrl (req: Req): Res {
    const payload = req.body
    const validateData = validationConfig(payload)
    if (isError(validateData) || !validateData.data) {
        return {
            success: false,
            message: validateData.error?.message || 'Invalid data',
            options: {
                status: 400
            }
        }
    }

    const findUserResult = await usersModel.findOne({ email: payload.email })
    if (isError(findUserResult) || !findUserResult.data) {
        return {
            success: false,
            message: 'Invalid email or password',
            options: {
                status: 400
            }
        }
    }

    const comparePasswordHash = await verifyPassword(payload.password, findUserResult.data.password || '')
    if (isError(comparePasswordHash) || !comparePasswordHash.data) return {
        success: false,
        message: 'Invalid email or password',
        options: {
            status: 400
        }
    }

    const authTokenResult = await generateAuthTokens(findUserResult.data)
    if (isError(authTokenResult) || !authTokenResult.data) {
        return {
            success: false,
            message: authTokenResult.error?.message || 'Something went wrong',
            options: {
                status: 400
            }
        }
    }

    return {
        message: 'Login successfully',
        success: true,
        data: {
            user: findUserResult.data,
            tokens: authTokenResult.data
        }
    }
}
