const socket = io()

const $messageForm = document.querySelector('#message-form')
const $mesaageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')




socket.on('message', (message) => {
    console.log(message)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()
    $messageFormButton.setAttribute('disabled' , 'disabled')
    const message = e.target.elements.message.value
    socket.emit('sendMessage' , message, (error) => {
     $messageFormButton.removeAttribute('disabled')
     $mesaageFormInput.value = ''
     $mesaageFormInput.focus()

        if(error){
            return console.log(error)
        }
        console.log("The Message was delivered")
    } )
 
})


$sendLocationButton.addEventListener('click', () => {
     if(!navigator.geolocation){
        return alert('Not supported')
     }

    $sendLocationButton.setAttribute('disabled' , 'disabled')

     navigator.geolocation.getCurrentPosition((position) =>{
        socket.emit('sendLocation', position , (error) => {
          $sendLocationButton.removeAttribute('disabled')

            if(error){
                return console.log(error)
            }
            console.log("Location shared")
        })
    })
})

