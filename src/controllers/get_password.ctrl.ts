import { Req, Res, validationConfig } from '../api_contracts/get_password.ctrl.contract'
import isError from '../utils/is_error.utils'
import passwordModel from '../models/passwords.models.server'
import { decryptString } from '../utils/encryption.util'
import envs from '../envs'

/**
 * Find one password
 */
export default async function getPasswordCtrl (req: Req): Res {
    const { user } = req
    const { id } = req.params
   const validateData = validationConfig({ id })
   if (isError(validateData) || !validateData.data) {
    return {
        success: false,
        message: validateData.error?.message || 'Invalid data',
        options: {
            status: 400
        }
    }
}
    const findPasswordResult = await passwordModel.findOne({ _id: id, user: user._id })
    if (isError(findPasswordResult) || !findPasswordResult.data) {
        return {
            success: false,
            message: findPasswordResult.error?.message || 'Password not found',
            options: {
                status: 400
            }
        }
    }

    const decryptPassword = decryptString(findPasswordResult.data.password, envs.secrets.encryption)
    if (isError(decryptPassword) || !decryptPassword.data) {
        return {
            success: false,
            message: decryptPassword.error?.message || 'Something went wrong',
            options: {
                status: 400
            }
        }
    }

    findPasswordResult.data.password = decryptPassword.data.decryptedData

    return {
        message: 'Fetched password successfully',
        success: true,
        data: findPasswordResult.data
    }
}
