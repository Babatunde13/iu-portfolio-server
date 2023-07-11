import express, { NextFunction, Request, Response } from 'express'
import serverless from 'serverless-http'
import requestLogger from 'morgan'
import cors from 'cors'
import envs from './envs'
import { HttpMethod, ServerConfig } from './server.types'
import logger from './shared/logger'

const corsConfig = {
    // Methods we allow
    methods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
    // Allows all header
    headers: '*',
    // Allow requests from all domains
    origins: '*', // Allows all origins
}

export const startServer = async (config: ServerConfig) => {
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cors())
    app.set('trust proxy', true)
    if (envs.env !== 'test') {
        app.use(requestLogger('dev'))
    }

    const serverlessRoute = '/api/v1/'
    const serverlessRouter = express.Router()
    config.routes.forEach((route) => {
        const { handlers, path, method } = route
        const middlewares = handlers.map((handler) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return async (req: any /** BaseReq */, res: Response, next: NextFunction) => {
                try {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const result: any = await handler(req)
                    if (result) {
                        if (result.options) {
                            if (result.options.status && typeof result.options.status === 'number') {
                                res.status(result.options.status)
                                if (result.options.status >= 400) {
                                    delete result.options
                                    res.json(result)
                                    return
                                }
                            }
                            if (result.options.redirect) {
                                res.redirect(result.options.redirect)
                                return
                            }
                            if (result.options.sendString) {
                                res.send(result.message)
                                return
                            }
                            delete result.options
                        }
                        if (result.isMiddleware) {
                            next()
                        } else {
                            res.json(result)
                        }
                    }
                } catch (error) {
                    console.log(error)
                    next(error)
                }
            }
        })

        if (method === HttpMethod.POST) {
            serverlessRouter.post(path, ...middlewares)
        } else if (method === HttpMethod.GET) {
            serverlessRouter.get(path, ...middlewares)
        } else if (method === HttpMethod.PUT) {
            serverlessRouter.put(path, ...middlewares)
        } else if (method === HttpMethod.DELETE) {
            serverlessRouter.delete(path, ...middlewares)
        }
    })

    app.use(serverlessRoute, serverlessRouter)

    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', corsConfig.origins)
        res.header('Access-Control-Allow-Headers', corsConfig.headers)
        if (req.method === 'OPTIONS') {
            // preflight request
            res.header('Access-Control-Allow-Methods', corsConfig.methods)
            return res.status(200).json({})
        }

        return next()
    })

    app.use('*', (req, res) => {
        res.status(404).json({
            success: false,
            message: 'Resource not found',
            data: null
        })
    })

    app.listen(config.port, () => {
        logger.info(`Server listening on port ${config.port} 🚀`, 'Server Startup')
    })

    return serverless(app, {
        basePath: serverlessRoute
    })
}

export default startServer
