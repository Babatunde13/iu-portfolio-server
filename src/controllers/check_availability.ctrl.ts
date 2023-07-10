import { Req, Res, validationConfig } from '../api_contracts/check_availability.ctrl.contract'
import isError from '../utils/is_error.utils'
import usersModel from '../models/users.models.server'

/**
 * Check  email and usernameavailability
 */
export default async function checkAvailabilityCtrl (req: Req): Res {
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

    let filter: any = {}
    if (payload.email) {
        filter.email = payload.email
    } else if (payload.username) {
        filter.username = payload.username
    } else {
        filter = { $or: [{ email: payload.email }, { username: filter.username }]}
    }
    const findUserResult = await usersModel.findOne(filter)
    if (isError(findUserResult)) {
        return {
            success: false,
            message: 'Error fetching account with username and email',
            options: {
                status: 400
            }
        }
    }

    if (findUserResult.data) {
        return {
            success: false,
            message: 'Account already exist',
            options: {
                status: 400
            }
        }
    }

    return {
        message: 'Checked email and password availability successfully',
        success: true,
        data: {}
    }
}
