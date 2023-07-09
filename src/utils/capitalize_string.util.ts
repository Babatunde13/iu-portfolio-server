export default function capitalizeString(word: string) {
    if (typeof word === 'undefined') return ''
    if (typeof word !== 'string') return word
    return word.charAt(0).toUpperCase() + word.slice(1)
}
