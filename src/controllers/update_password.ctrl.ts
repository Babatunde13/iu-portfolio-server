import { Req, Res, validationConfig } from '../api_contracts/update_password.ctrl.contract'
import isError from '../utils/is_error.utils'
import passwordModel, { IPassword } from '../models/passwords.models.server'
import { decryptString, encryptString } from '../utils/encryption.util'
import envs from '../envs'

/**
 * Update password
 */
export default async function updatePasswordCtrl (req: Req): Res {
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

    const update: Partial<IPassword> = {}
    if (payload.category) update.category = payload.category
    if (payload.password) {
        const encryptPassword = encryptString(payload.password, envs.secrets.encryption)
        if (isError(encryptPassword) || !encryptPassword.data) {
            return {
                success: false,
                message: encryptPassword.error?.message || 'Something went wrong',
                options: {
                    status: 400
                }
            }
        }
        update.password = encryptPassword.data.encryptedData
    }
    if (payload.website) update.website = payload.website
    if (payload.account_name) update.account_name = payload.account_name
    if (payload.username) update.username = payload.username
    // validate request
    const updatePasswordResult = await passwordModel.updateOne({ _id: payload._id, user: user._id }, { $set: update })
    if (isError(updatePasswordResult) || !updatePasswordResult.data) {
        return {
            success: false,
            message: updatePasswordResult.error?.message || 'Something went wrong',
            options: {
                status: 400
            }
        }
    }

    const decryptPassword = decryptString(updatePasswordResult.data.password, envs.secrets.encryption)
    if (isError(decryptPassword) || !decryptPassword.data) {
        return {
            success: false,
            message: decryptPassword.error?.message || 'Something went wrong',
            options: {
                status: 400
            }
        }
    }

    updatePasswordResult.data.password = decryptPassword.data.decryptedData

    return {
        message: 'Updated password successfully',
        success: true,
        data: updatePasswordResult.data
    }
}
