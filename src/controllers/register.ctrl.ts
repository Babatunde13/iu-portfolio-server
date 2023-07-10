import { Req, Res, validationConfig } from '../api_contracts/register.ctrl.contract'
import isError from '../utils/is_error.utils'
import usersModel from '../models/users.models.server'
import capitalizeString from '../utils/capitalize_string.util'
import { generateAuthTokens } from './library/generate_auth_tokens'

/**
 * Registers user account
 */
export default async function registerCtrl (req: Req): Res {
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

    const [firstName, lastName] = payload.name.split(' ')
    const registerResult = await usersModel.createAndSave({
        username: payload.username,
        password: payload.password,
        email: payload.email,
        firstName: capitalizeString(firstName),
        lastName: capitalizeString(lastName)

    })
    if (isError(registerResult) || !registerResult.data) {
        return {
            success: false,
            message: 'Account already exists',
            options: {
                status: 400
            }
        }
    }

    const authTokenResult = await generateAuthTokens(registerResult.data)
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
        message: 'Registered successfully',
        success: true,
        data: {
            user: registerResult.data,
            tokens: authTokenResult.data
        }
    }
}
