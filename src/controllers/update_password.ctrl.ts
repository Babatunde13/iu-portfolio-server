import { Req, Res } from '../api_contracts/update_password.ctrl.contract'
import isError from '../utils/is_error.utils'
import passwordModel, { IPassword } from '../models/passwords.models.server'
import { decryptString } from '../utils/encryption.util'
import envs from '../envs'

/**
 * Update password
 */
export default async function updatePasswordCtrl (req: Req): Res {
    const { user } = req
    const payload = req.body
    const update: Partial<IPassword> = {}
    if (payload.password) update.password = payload.password
    if (payload.url) update.url = payload.url
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
