import React from 'react'

const User = ({user}) => {

  function showChats(){
      console.log(user)
    document.getElementsByClassName('user_heading').innerHTML = `${user.name}`;
  }
  
  return (
    <li className="userlist"onClick={showChats}>{user.name}</li>
  )
}

export default User