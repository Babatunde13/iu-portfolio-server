import { Schema } from 'mongoose'
import { BaseModel, ModelAPI } from './base.model.server'
import { PasswordClient } from './passwords.model.client'
import { encryptString } from '../utils/encryption.util'
import isError from '../utils/is_error.utils'
import envs from '../envs'

export interface IPassword extends ModelAPI<PasswordClient> {}
const passwordModel = new BaseModel<IPassword, PasswordClient>({
    name: 'Password',
    schema: {
        website: String,
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            index: true
        },
        account_name: String,
        password: String,
        username: String,
        
    },
    toJSON(password) {
        return {
            _id: password._id.toString(),
            user: password.user.toString(),
            category: password.category?.toString(),
            account_name: password.account_name,
            website: password.website,
            username: password.username,
            password: password.password,
            created: password.created,
            updated: password.updated,
        }
    },
    async preSave (password: any) {
        const encryptPassword = encryptString(password.password, envs.secrets.encryption)
        if (isError(encryptPassword) || !encryptPassword.data) {
            return encryptPassword
        }
        password.password = encryptPassword.data?.encryptedData
        return password
    }
})

export default passwordModel
