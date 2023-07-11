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
import createCategoryCtrl from './controllers/create_category.ctrl'
import getCategoriesCtrl from './controllers/get_categories.ctrl'
import forgotPasswordCtrl from './controllers/forgot_password.ctrl'
import resetPasswordCtrl from './controllers/reset_password.ctrl'
import generateRandomPasswordCtrl from './controllers/generate_password.ctrl'
import checkAvailabilityCtrl from './controllers/check_availability.ctrl'
import verifyResetPasswordTokenCtrl from './controllers/verify_reset_password_token.ctrl'

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
        path: '/api/v1/check-availability/',
        method: POST,
        handlers: [checkAvailabilityCtrl]
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
        path: '/api/v1/categories/',
        method: POST,
        handlers: [requiresLogin, createCategoryCtrl]
    },
    {
        path: '/api/v1/categories/',
        method: GET,
        handlers: [requiresLogin, getCategoriesCtrl]
    },
    {
        path: '/api/v1/logout/',
        method: POST,
        handlers: [requiresLogin, logoutCtrl]
    },
    {
        path: '/api/v1/refresh-token/',
        method: POST,
        handlers: [refreshToken]
    },
    {
        path: '/api/v1/forgot-password/',
        method: POST,
        handlers: [forgotPasswordCtrl]
    },
    {
        path: '/api/v1/reset-password/',
        method: POST,
        handlers: [resetPasswordCtrl]
    },
    {
        path: '/api/v1/verify-reset-password-token/',
        method: POST,
        handlers: [verifyResetPasswordTokenCtrl]
    },
    {
        path: '/api/v1/generate-password/',
        method: POST,
        handlers: [generateRandomPasswordCtrl]
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
                        redirect: 'https://documenter.getpostman.com/view/24925005/2s946bAuLt',
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
                    message: `Welcome to StrongPass API, you can access the <a href="${req.protocol}://${req.get('host')}/api/v1/docs">docs</a> here.`,
                    options: {
                        sendString: true
                    }
                }
            }
        ]
    }
]
