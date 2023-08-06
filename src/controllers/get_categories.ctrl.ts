import isError from '../utils/is_error.utils'
import { Req, Res } from '../api_contracts/get_categories.ctrl.contract'
import categoryModel from '../models/categories.model.server'

/**
 * Get all categories
 */
export default async function getCategoriesCtrl (req :Req): Res {
    const filter = req.query.name ? { url: { $regex: req.query.name, $options: 'i' } } : {}
    const categoriesResult = await categoryModel.find({ ...filter, user: req.user._id })
    if (isError(categoriesResult) || !categoriesResult.data) {
        return {
            success: false,
            message: categoriesResult.error?.message || 'Something went wrong',
            options: {
                status: 400
            }
        }
    }
    
    return {
        success: true,
        data: {
            data: categoriesResult.data
        },
        message: 'Fetched categories'
    }
}
