import bcrypt from 'bcrypt'
import AppError from '../shared/AppError'

export const verifyPassword = async (password: string, hashPassword: string) => {
    try {
        const hash = await bcrypt.compare(password, hashPassword)
        return {
            data: hash
        }
    } catch (e) {
        return {
            error: new AppError((e as Error).message, 'invalid_hashing')
        }
    }
}
