import AppError from '../shared/AppError'

export interface DataOrError<T> {
    data?: T;
    error?: AppError
}
