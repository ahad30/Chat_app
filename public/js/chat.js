const socket = io()
socket.on('message', (message) => {
    console.log(message)
    })

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const message = e.target.elements.message.value
    socket.emit('sendMessage' , message, (error) => {
        if(error){
            return console.log(error)
        }
        console.log("The Message was delivered")
    } )
 
})


document.querySelector('#send-location').addEventListener('click', () => {
     if(!navigator.geolocation){
        return alert('Not supported')
     }
     navigator.geolocation.getCurrentPosition((position) =>{
        socket.emit('sendLocation', position , (error) => {
            if(error){
                return console.log(error)
            }
            console.log("Location shared")
        })
    })
})

