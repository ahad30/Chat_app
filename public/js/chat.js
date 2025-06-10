const socket = io()

// Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

//Template
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML

// Options
const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix: true})
// console.log(username)

socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    }) 
    $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('messageLocation', (message) => {
    console.log(message)
    const html = Mustache.render(locationTemplate, {
         url: message.url,
        createdAt: moment(message.createdAt).format('h:mm a')
    }) 
    $messages.insertAdjacentHTML('beforeend', html)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()
    $messageFormButton.setAttribute('disabled' , 'disabled')
    const message = e.target.elements.message.value
    socket.emit('sendMessage' , message, (error) => {
    $messageFormButton.removeAttribute('disabled')
     $messageFormInput.value = ''
     $messageFormInput.focus()
    //  if(message === '') return alert('Please type something first')
     if(error) return alert('Profinity Not allowed')
     
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

socket.emit('join' , {username, room})
