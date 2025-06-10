const generateMessage = (text , createdAt) => {
    return {
        text,
        createdAt: new Date().getTime()
    }
}
const generateLocation = (url , createdAt) => {
    return {
        url,
        createdAt: new Date().getTime()
    }
}



module.exports = {
    generateMessage,
    generateLocation
}
