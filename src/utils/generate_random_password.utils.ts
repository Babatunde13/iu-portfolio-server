export const generateRandomPassword = (length: number) => {
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()-=_+'
  
    const allCharacters = uppercaseLetters + lowercaseLetters + numbers + symbols
    let password = ''
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allCharacters.length)
      password += allCharacters[randomIndex]
    }
  
    return password
}
