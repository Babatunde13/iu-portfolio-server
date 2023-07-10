import { Res } from '../api_contracts/generate_password.ctrl.contract'
import { generateRandomPassword } from '../utils/generate_random_password.utils'

/**
 * Generates a random password
 */
export default async function generateRandomPasswordCtrl (): Res {
    const password = generateRandomPassword(16)

    return {
        message: 'Password generated successfully',
        success: true,
        data: { password }
    }
}
