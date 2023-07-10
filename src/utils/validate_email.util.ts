export const validateEmail = (email: string) => {
    if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
        return (true)
    }

    return (false)
}
