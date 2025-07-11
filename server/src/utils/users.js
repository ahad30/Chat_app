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
        return user.room && user.username === username
      }
    )
    console.log("Exist",existingUser)
     
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
    console.log("rooms user",rooms)
    return rooms;
}


const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    const removed = users.splice(index, 1)[0];
    console.log("Removed user:", removed);
    return removed;
  } else {
    console.log("User not found with id:", id);
  }
};



module.exports = {
    addUser,
    getUserById,
    getUsersInRoom,
    removeUser
}