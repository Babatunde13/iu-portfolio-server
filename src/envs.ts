import { config } from 'dotenv'
import AppError from './shared/AppError'

config()

const getDatabaseUrl = () => {
    if (process.env.NODE_ENV === 'test') {
        return process.env.TEST_DATABASE_URL || 'mongodb://localhost:27017/express-ts-boilerplate-test'
    }

    return process.env.DATABASE_URL || 'mongodb://localhost:27017/express-ts-boilerplate'
}

const envs = {
    port: parseInt(process.env.PORT || '3001'),
    host: process.env.HOST || 'localhost:3001',
    app_url: process.env.APP_URL || 'http://localhost:4001',
    db: {
        DATABASE_URL: getDatabaseUrl(),
    },
    env: process.env.NODE_ENV || 'development',
    secrets: {
        jwt: process.env.JWT_SECRET || 'secret',
        encryption: process.env.ENCRYPTION_PUB_KEY || 'encrypt'
    },
    mail: {
        sender: process.env.SENDER_EMAIL || '',
        api_key: process.env.MJ_APIKEY_PUBLIC || '',
        api_secret: process.env.MJ_APIKEY_PRIVATE || ''
    }
}

const verifyEnv = () => {
    if (!envs.db.DATABASE_URL) {
        throw new AppError('DATABASE_URL is not set', 'environment_variables_check')
    }

    if (!envs.secrets.jwt) {
        throw new AppError('JWT_SECRET is not set', 'environment_variables_check')
    }

    if (!envs.secrets.encryption) {
        throw new AppError('ENCRYPTION_PUB_KEY is not set', 'environment_variables_check')
    }

    if (!envs.port) {
        throw new AppError('PORT is not set', 'environment_variables_check')
    }

    if (!envs.mail.sender) {
        throw new AppError('SENDER_EMAIL is not set', 'environment_variables_check')
    }

    if (!envs.mail.api_key) {
        throw new AppError('MJ_APIKEY_PUBLIC is not set', 'environment_variables_check')
    }

    if (!envs.mail.api_secret) {
        throw new AppError('MJ_APIKEY_PRIVATE is not set', 'environment_variables_check')
    }

    if (!envs.host) {
        throw new AppError('HOST URL is not set', 'environment_variables_check')
    }

    if (!envs.app_url) {
        throw new AppError('APP URL is not set', 'environment_variables_check')
    }

    if (!envs.env) {
        throw new AppError('NODE_ENV is not set', 'environment_variables_check')
    }

    return true
}

verifyEnv()

export default envs
