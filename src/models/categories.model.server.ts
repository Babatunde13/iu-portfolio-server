import { Schema } from 'mongoose'
import { BaseModel, ModelAPI } from './base.model.server'
import { CategoryClient } from './categories.model.client'

export interface ICategory extends ModelAPI<CategoryClient> {}
const categoryModel = new BaseModel<ICategory, CategoryClient>({
    name: 'Category',
    schema: {
        name: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    },
    toJSON(user) {
        return {
            _id: user._id.toString(),
            user: user.user.toString(),
            name: user.name,
            created: user.created,
            updated: user.updated,
        }
    },
})

export default categoryModel

