import AppError from '../shared/AppError'

export const validatePassword = (password: string): void => {
    if (!/(?=.*[A-Z])/.test(password)) {
      throw new AppError('Password must contain at least one uppercase letter')
    }
  
    if (!/(?=.*\d)/.test(password)) {
      throw new AppError('Password must contain at least one digit')
    }
  
    if (!/(?=.*\W)/.test(password)) {
      throw new AppError('Password must contain at least one non-alphanumeric character')
    }
  
    if (password.length < 8) {
      throw new AppError('Password must be at least 8 characters long')
    }
  }
  