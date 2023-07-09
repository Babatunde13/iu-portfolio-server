import { hashPassword } from '../utils/hash_password.utils'
import isError from '../utils/is_error.utils'
import { BaseModel, ModelAPI } from './base.model.server'
import { UserClient } from './users.model.client'

export interface IUSer extends ModelAPI<UserClient> {}
const userModel = new BaseModel<IUSer, UserClient>({
    name: 'User',
    schema: {
        email: {
            type: String,
            required: true,
            unique: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        firstName: String,
        lastName: String
    },
    toJSON(user) {
        return {
            _id: user._id.toString(),
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            created: user.created,
            updated: user.updated,
        }
    },
    async preSave (user: any) {
        const hashedPassword = await hashPassword(user.password)
        if (isError(hashedPassword)) {
            return hashedPassword
        }
        user.password = hashedPassword.data
        return user
    }
})

export default userModel

