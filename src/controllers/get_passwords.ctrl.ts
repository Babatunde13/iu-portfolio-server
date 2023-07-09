import isError from '../utils/is_error.utils'
import { Req, Res } from '../api_contracts/get_passwords.ctrl.contract'
import passwordModel from '../models/passwords.models.server'

/**
 * Get all passwords
 */
export default async function getPasswordsCtrl (req:Req): Res {
    const page = req.query.page || 1
    const limit = req.query.per_page || 10
    const findOptions = {
        skip: (page - 1) * limit,
        limit,
    }
    const filter = req.query.url_filter ? { url: { $regex: req.query.url_filter, $options: 'i' } } : {}
    const passwordsResult = await passwordModel.find(filter, findOptions)
    if (isError(passwordsResult) || !passwordsResult.data) {
        return {
            success: false,
            message: passwordsResult.error?.message || 'Something went wrong',
            options: {
                status: 400
            }
        }
    }

    const passwordCountResult = await passwordModel.count(filter, findOptions)
    if (isError(passwordCountResult)) {
        return {
            success: false,
            message: passwordCountResult.error?.message || 'Something went wrong',
            options: {
                status: 400
            }
        }
    }

    const fetchedPage = page * limit
    const pageLeft = passwordCountResult.data - fetchedPage
    const hasNextPage = pageLeft > 0
    return {
        success: true,
        data: {
            data: passwordsResult.data,
            pagination: {
                count: passwordCountResult.data,
                hasNextPage
            }
        },
        message: 'Fetched passwords'
    }
}
