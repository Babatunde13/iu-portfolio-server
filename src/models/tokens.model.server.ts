import { Schema } from 'mongoose'
import { BaseModel, ModelAPI } from './base.model.server'
import { TokenTypes, TokenClient } from './tokens.model.client'

export interface IToken extends ModelAPI<TokenClient> {}
const tokenModel = new BaseModel<IToken, TokenClient>({
    name: 'Token',
    schema: {
        token: {
            type: String,
            required: true,
            unique: true
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        expires: {
			type: Date,
			required: true,
		},
		blacklisted: {
			type: Boolean,
			default: false,
		},
        type: {
			type: String,
			enum: [
				TokenTypes.ACCESS,
				TokenTypes.REFRESH,
				TokenTypes.RESET_PASSWORD,
				TokenTypes.VERIFY_EMAIL,
			],
			required: true,
		}
    },
    toJSON(token) {
        return {
            _id: token._id.toString(),
            type: token.type,
            blacklisted: token.blacklisted,
            expires: token.expires,
            user: token.user,
            token: token.token,
            created: token.created,
            updated: token.updated,
        }
    },
})

export default tokenModel

