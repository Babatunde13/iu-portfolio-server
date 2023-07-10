import { Req, Res, validationConfig } from '../api_contracts/delete_passwords.ctrl.contract'
import isError from '../utils/is_error.utils'
import passwordModel from '../models/passwords.models.server'

/**
 * delete multiple password
 */
export default async function deletePasswordsCtrl (req: Req): Res {
    const { user } = req
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

    const updatePasswordResult = await passwordModel.deleteMany({ _id: { $in: payload._ids }, user: user._id })
    if (isError(updatePasswordResult) || !updatePasswordResult.data) {
        return {
            success: false,
            message: updatePasswordResult.error?.message || 'Something went wrong',
            options: {
                status: 400
            }
        }
    }

    return {
        message: 'Deleted passwords successfully',
        success: true,
        data: `Successfully deleted ${updatePasswordResult.data.deletedCount} password${updatePasswordResult.data.deletedCount > 1 ? 's' : ''}`
    }
}
