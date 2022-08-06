import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import ChatInput from "./ChatInput";
import axios from "axios";
import {v4} from "uuid"
const ChatContainer = ({currentChat, currenUser , socket}) => {
    const [messages, setMessages] = useState([])
    const [arrivalMessages, setArrivalMessages] = useState(null)
    const scrollRef = useRef()
    useEffect(() => {
        async function GetAllMessages() {
            if(currentChat){
                return await axios.post(`http://localhost:5000/api/get-message`, {
                    from: currenUser._id,
                    to: currentChat._id
                });
            }
        }
        GetAllMessages().then(result => {
            result && setMessages(result.data.projectedMessages)

        }).catch(error => {
            console.log(error)
        })
    }, [currentChat])

    async function handleSendMessage(msg) {
        await axios.post("http://localhost:5000/api/add-message", {
            message: msg,
            from: currenUser._id,
            to: currentChat._id
        })
        socket.current.emit("send-message" , {
            to : currentChat._id,
            from : currenUser._id,
            message :msg
        })
        const msgs = [...messages]
        msgs.push({fromSelf :true , message:msg})
        setMessages(msgs)
    }

    useEffect(() => {
        if(socket.current){
            socket.current.on("msg-recieve" ,(message) => {
                setArrivalMessages({fromSelf:false,message : message})
            })
        }
    } , [])
    useEffect(() => {
        arrivalMessages && setMessages((prev) => [...prev,arrivalMessages])
    } , [arrivalMessages])
    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    } , [messages] )
    return (
        <Container>
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                        <img
                            src={`data:image/svg+xml;base64,${currentChat.avatar_url}`}
                            alt=""
                        />
                    </div>
                    <div className="username">
                        <h3>{currentChat.userName}</h3>
                    </div>
                </div>
            </div>
            <div className="chat-messages">
                {messages ? messages.map((message) => {
                    return (
                        <div ref={scrollRef} key={v4()}>
                            <div
                                className={`message ${
                                    message.fromSelf ? "sended" : "recieved"
                                }`}
                            >
                                <div className="content ">
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        </div>
                    );
                }) : <h1>No message yet</h1>}
            </div>
            <ChatInput handleSendMessage={handleSendMessage}/>
        </Container>
    );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;

    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;

      .avatar {
        img {
          height: 3rem;
        }
      }

      .username {
        h3 {
          color: white;
        }
      }
    }
  }

  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0.2rem;

      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .message {
      display: flex;
      align-items: center;

      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }

    .sended {
      justify-content: flex-end;

      .content {
        background-color: #4f04ff21;
      }
    }

    .recieved {
      justify-content: flex-start;

      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
export default ChatContainer;