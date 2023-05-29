import { Fragment, useEffect, useState } from "react";
import "./App.css";
// import User from "./User.js";

let hismessage = [["hi","how are you"],[],[],["hi can you give me your notes"],[],[],[],[],[],[]];
let mymessage =  [["hlo","i'm fine","ok"],[],[],["sure"],[],[],[],[],[],[]];
let names = [];
// let mychatarr = [0,3];

function App() {
  const [users, SetUsers] = useState([]);
  // const [flag, Setflag] = useState(0);
  const [mychats,SetMychats] = useState(1);
  const [chatuser,Setchatuser] = useState({});

  // let mychat = true;
  const getAllUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    Array.from(data).map((user)=>{
      names.push(user.name);
    })
    SetUsers(data);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  function setKardeabisko(usr){
    // console.log("setkrfunction"+usr);
    Setchatuser(usr);
  }
  function showChats(usr){
    document.getElementById('user_heading').innerHTML = usr.name;
    //  Setflag(0);
    let marea = document.getElementById('messageArea');
    marea.innerHTML = "";
    let hislen = hismessage[usr.id-1].length;
    let mylen = mymessage[usr.id-1].length;
    
    for(let i=0;i<Math.max(hislen,mylen);i++){
  if(hismessage[usr.id-1][i]!==undefined)marea.innerHTML += `<li class="histext">${hismessage[usr.id-1][i]}</li>`;
  if(mymessage[usr.id-1][i]!==undefined)marea.innerHTML += `<div class="outerply"><li class="reply">${mymessage[usr.id-1][i]}</li></div>`;
    }
    setKardeabisko(usr);
  }

  function toggle(){
    SetMychats(1-mychats);
  }

  function addValue(){
    let mtext = document.getElementById('minetext');
    mymessage[chatuser.id-1].push(mtext.value);
    mtext.value = "";
    showChats(chatuser);
  }
  function solve(arr,val,messname){
      let output = [];
      for(let ele of arr){
        if(ele.includes(val))output.push(messname+" : "+ele);
      }
      if(output.length!=0){console.log("solve");console.log(output);}
      return output;
  }
  function searchValue(){
    let mtext = document.getElementById('minesearch');
    let ouput = [];
    let i=0;
    for(let mess of hismessage){
       let arr = solve(mess,mtext.value,names[i]);
       ouput.push.apply(ouput, arr);
       i++;
    }
    i=0;
    for(let mess of mymessage){
      let arr = solve(mess,mtext.value,"mine");
      ouput.push.apply(ouput, arr);
      i++;
    }
    
    let searchresult = document.getElementById('sresult');
    searchresult.innerHTML = "";
    if(ouput.length==0){
      searchresult.innerHTML = `<li style="text-align:center;font-family: 'Roboto Flex', sans-serif;">no result found</li>`
    }
    else
    {ouput.map((res)=>{
      searchresult.innerHTML += `<li style="text-align:center;font-family: 'Roboto Flex', sans-serif;">${res}</li>`;
      // searchresult.innerHTML = "";
    })}
     mtext.value = "";
  }

  return (
    <Fragment>
      <div id="chatPage">
        <div id="allUsers">
           <div id="typeSearch">
                <input type="text" id="minesearch"></input>
                <input type="submit" id="search" onClick={searchValue} value="Search"></input>
            </div>
            <ol id="sresult"></ol>
              {
                mychats===1 ? <div>
                  <button id="contactbtn"onClick={toggle}>See Contact List</button>

                    <div className='list_heading'>My Chats</div>
                    <ol className="contact_list">
                      {/* {
                      Array.from(mychatarr).forEach((index)=>(
                        <li className="userlist"onClick={()=>showChats(users[index])}>{users[index].name}</li>
                      ))} */}
                    </ol></div> : 
                    <div> 
                      <button id="contactbtn"onClick={toggle}>See Your Chats</button>

                      <div className='list_heading'>My Contacts</div>
                      <ol className="contact_list">
                     { users.map((user,index) => (
                         
                        <li className="userlist"onClick={()=>showChats(user)}>{user.name}</li>
                          // <User user={user}/>
                      ))}
                        </ol></div>
              }
          
        </div>
        <div id="chatBox">
          {/* {
            flag===1 ? <div id="no_chat">
              Welcome to My Chat App
            </div> :  */}
            <div> 
              <div id="user_heading"></div>
              <ol id="messageArea"></ol>
            <div id="typeSend">
                <input type="text" id="minetext"></input>
                <input type="submit" id="send" onClick={addValue} value="Send"></input>
            </div>
            </div>
            
          {/* } */}
          
        </div>
      </div>
    </Fragment>
    
  );
}

export default App;