import crypto from 'crypto'
import AppError from '../shared/AppError'

/**
 * General purpose data encryption function.
 */
export function encryptString(data: string, encryptionKey: string) {
    if (!data) {
        return {
            error: new AppError('Invalid input')
        }
    }

    if (!encryptionKey) {
        return {
            error: new AppError('Invalid encryption key')
        }
    }

    const cipher = crypto.createCipher('aes256', encryptionKey)
    const encryptedData = cipher.update(`${data}`, 'utf8', 'hex') + cipher.final('hex')

    return {
        data: {
            encryptedData
        }
    }
}

/**
 * General purpose data decryption function.
 */
export function decryptString(data: string, decryptionKey: string) {
    if (!data) {
        return {
            error: new AppError('Invalid input')
        }
    }

    if (!decryptionKey) {
        return {
            error: new AppError('Invalid encryption key')
        }
    }

    let decryptedData = ''

    try {
        const decipher = crypto.createDecipher('aes256', decryptionKey)
        decryptedData = decipher.update(data, 'hex', 'utf8') + decipher.final('utf8')
    } catch (e) {
        return {
            error: new AppError((e as Error).message)
        }
    }

    return {
        data: {
            decryptedData
        }
    }
}
