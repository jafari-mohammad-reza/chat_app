import React, {useState} from 'react';
import styled from "styled-components";
import EmojiPicker from "emoji-picker-react";
import {IoMdSend} from "react-icons/io"
import {BsEmojiSmileFill} from "react-icons/bs"
import axios from "axios"
function ChatInput({handleSendMessage}) {
    const [showEmoji, setShowEmoji] = useState(false)
    const [message, setMessage] = useState("")
    const handleEmojiPickerVisibility = () => {
        setShowEmoji(!showEmoji)
    }
    const handleEmojiClick = (event, emoji) => {
        let msg = message;
        msg += emoji.emoji
        setMessage(msg)
    }

    const sendChat = (event) => {
        event.preventDefault()
        if (message.length > 0) {
            handleSendMessage(message)
            setMessage("")
        }
    }
    return (
        <Container>
            <div className="btn-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerVisibility}/>
                    {showEmoji && <EmojiPicker onEmojiClick={handleEmojiClick}/>}
                </div>

            </div>
            <form className={"input-container"} onSubmit={(event) => sendChat(event)}>
                <input type="text" placeholder={"type your message here...."} value={message}
                       onChange={e => setMessage(e.target.value)}/>
                <button className="submit">
                    <IoMdSend/>
                </button>
            </form>
        </Container>
    );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #080420;
  padding: 0 2rem 0.3rem;

  .btn-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;

    .emoji {
      position: relative;

      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }

      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;

        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }

        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }

        .emoji-group:before {
          background-color: #090420;
        }

        .emoji-scroll-wrapper::-webkit-scrollbar {
          display: none;
        }
      }
    }
  }

  .input-container {
    width: 100%;
    height: 60%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff43;

    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9186f3;
      }

      &:focus {
        outline: none;

      }

    }

  }

  button {
    padding: 0.3rem 2rem;
    border-radius: 2rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #9a86f3;
    border: none;

    svg {
      font-size: 2rem;
      color: white;
    }
  }
`
export default ChatInput;