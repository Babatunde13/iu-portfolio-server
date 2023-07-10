export const validatePassword = (password: string) => {
    if (/^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/.test(password)) {
        return (true)
    }

    return (false)
}
