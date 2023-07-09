import { HttpMethod, Route } from './server.types'
import requiresLogin from './middlewares/requires_login.middleware'
import registerCtrl from './controllers/register.ctrl'
import loginCtrl from './controllers/login.ctrl'
import getPasswordsCtrl from './controllers/get_passwords.ctrl'
import getPasswordCtrl from './controllers/get_password.ctrl'
import createPasswordCtrl from './controllers/create_password.ctrl'
import deletePasswordsCtrl from './controllers/delete_passwords.ctrl'
import updatePasswordCtrl from './controllers/update_password.ctrl'
import logoutCtrl from './controllers/logout.ctrl'
import refreshToken from './controllers/refresh_token.ctrl'

const { GET, POST, DELETE, PUT } = HttpMethod

export const routes: Route[] = [
    {
        path: '/api/v1/register/',
        method: POST,
        handlers: [registerCtrl]
    },
    {
        path: '/api/v1/login/',
        method: POST,
        handlers: [loginCtrl]
    },
    {
        path: '/api/v1/passwords/:id',
        method: GET,
        handlers: [requiresLogin, getPasswordCtrl]
    },
    {
        path: '/api/v1/passwords/',
        method: GET,
        handlers: [requiresLogin, getPasswordsCtrl]
    },
    {
        path: '/api/v1/passwords/',
        method: POST,
        handlers: [requiresLogin, createPasswordCtrl]
    },
    {
        path: '/api/v1/passwords/',
        method: DELETE,
        handlers: [requiresLogin, deletePasswordsCtrl]
    },
    {
        path: '/api/v1/passwords/',
        method: PUT,
        handlers: [requiresLogin, updatePasswordCtrl]
    },
    {
        path: '/api/v1/logout/',
        method: POST,
        handlers: [requiresLogin, logoutCtrl]
    },
    {
        path: '/api/v1/refresh_token/',
        method: POST,
        handlers: [requiresLogin, refreshToken]
    },
    {
        path: '/api/v1/docs',
        method: GET,
        handlers: [
            async () => {
                return {
                    success: true,
                    data: null,
                    message: '',
                    options: {
                        redirect: '/docs/index.html',
                        status: 302,
                    }
                }
            }
        ]
    },
    {
        path: '/',
        method: GET,
        handlers: [
            async (req) => {
                return {
                    success: true,
                    data: null,
                    message: `Welcome to Passwordly API, you can access the <a href="${req.protocol}://${req.get('host')}/api/v1/docs">docs</a> here.`,
                    options: {
                        sendString: true
                    }
                }
            }
        ]
    }
]
