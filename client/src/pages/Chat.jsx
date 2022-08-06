import React, {useEffect, useRef, useState} from 'react'
import styled from "styled-components";
import Contacts from "../components/Contacts";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import ChatContainer from "../components/ChatContainer";
import Welcom from "../components/Welcom";
import {io} from "socket.io-client"
function Chat() {
    const socket = useRef()
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);
    const navigate = useNavigate()
    useEffect(() => {
        async function GetCurrentUser() {
            if (!localStorage.getItem("user")) {
                navigate("/login");
            } else {

                return await JSON.parse(localStorage.getItem("user"))

            }
        }

        GetCurrentUser().then(result => {
            setCurrentUser(result)
        }).catch(err => console.log(err))
    }, []);
    useEffect(() => {
        if(currentUser){
            socket.current = io("http://localhost:5000")
            socket.current.emit("add-user" , currentUser._id)

        }
    } , [currentUser])


    useEffect(() => {
        async function GetContacts() {
            if (currentUser) {
                if (currentUser.isAvatarImageSet) {

                    const response = await axios.get(`http://localhost:5000/api/users/${currentUser._id}`);
                    setContacts(response.data.contacts)

                } else {
                    navigate("/set-avatar");
                }
            }
        }

        GetContacts().catch(err => console.log(err))

    }, [currentUser]);
    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };
    return (
        <Container>
            <div className="container">
                {currentUser && contacts ? <>
                    <Contacts contacts={contacts} changeChat={handleChatChange}/>
                    {currentChat ? <ChatContainer currentChat={currentChat} currenUser={currentUser} socket={socket} /> : <Welcom currentUser={currentUser}  />}
                </> : <h1>Loading</h1>}
            </div>
        </Container>
    )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131324;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35%  65%;
    }

  }

`
export default Chat