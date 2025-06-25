const users = []

const addUser = ({id , username, room}) => {
     username = username.trim().toLowerCase()
     room = room.trim().toLowerCase()

     if(!username || !room) {
        return {
            error: "Username and room are required"
        }
     }

     const existingUser = users.find((user) => {
        return user.room === room && user.username === username
      }
    )
     
     if(existingUser) {
        return {
            error: "Usrename  already in use try a new one"
        }
     }
    
     const user = {id , username , room}
     users.push(user)
    return {user}    
}


const getUserById =  (id) => {
    const user = users.find((user) => user.id === id)
    return user;
}

const getUsersInRoom =  (room) => {
    const rooms = users.filter((user) => user.room === room)
    return rooms;
}





const removeUser =  (id) => {
    const index = users.findIndex((user) => user.id === id)

    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}

//  addUser({
//     id:1,
//     username:"Ahad",
//     room: "ahusha"
//  })
//  addUser({
//     id:2,
//     username:"Nusha",
//     room: "ahusha"
//  })
//  addUser({
//     id:3,
//     username:"Nawar",
//     room: "South City"
//  })



module.exports = {
    addUser,
    getUserById,
    getUsersInRoom,
    removeUser
}