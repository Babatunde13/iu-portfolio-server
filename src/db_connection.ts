import mongoose from 'mongoose'
import envs from './envs'
import logger from './shared/logger'

export const createDbConnection = async () => {
    try {
        const connection = await mongoose.connect(envs.db.DATABASE_URL)
        logger.info('Database connected Successfully', 'Database Connection')
        return {
            data: connection
        }
    } catch (e) {
        return {
            error: e
        }
    }
}
