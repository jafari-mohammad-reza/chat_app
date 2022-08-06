import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import {Buffer} from "buffer"

export default function SetAvatar() {
    const avatarsApi = 'https://api.multiavatar.com/'
    const navigate = useNavigate()
    const [avatars, setAvatars] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedAvatar, setSelectedAvatar] = useState(undefined)
    useEffect(() => {
        if (!JSON.stringify(localStorage.getItem("user"))) {
            navigate("/login")
        }
    }, [])
    const setAvatarPicture = async () => {
        if (!selectedAvatar) {
            return alert("Please select an avatar")
        } else {
            const user = await JSON.parse(localStorage.getItem("user"))
            console.log(user)
            const {data} = await axios.post(`http://localhost:5000/api/set-avatar/${user._id}`, {
                image: avatars[selectedAvatar]
            })
            console.log("data : ", data)
            if (data.status === 200) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                console.log(user)
                await localStorage.setItem("user", JSON.stringify(user))
                navigate("/")
            } else {
                return alert("Something happened while setting your avatar.")
            }
        }

    }
    useEffect(() => {
        let data = []

        async function getImages() {
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(`${avatarsApi}/${Math.round(Math.random() * 1000)}`)
                const buffer = new Buffer(image.data)
                data.push(buffer.toString("base64"))
            }
        }

        getImages().then(result => {
            setAvatars(data)
            setIsLoading(false)
        })
    }, [])
    return (
        <Container>
            {isLoading ? <h1>Loading</h1> : (
                <>
                    <div className="title">
                        <h1>Select your avatar</h1>
                    </div>
                    <div className="avatars">
                        {avatars && avatars.map((avatar, index) => {
                            return (
                                <div className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                                    <img src={`data:image/svg+xml;base64,${avatar}`} alt=""
                                         onClick={() => setSelectedAvatar(index)}/>

                                </div>
                            )
                        })}
                    </div>
                    <button className={"submitBtn"} onClick={setAvatarPicture}>Set as your profile picture</button>
                </>
            )}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title {
    h1{
      color: #fff;
      
    }
  }
  .avatars { 
    display: flex;
    gap: 2rem;
    .avatar{
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
      }
      
    }
    .selected {
      border : 0.4rem solid #4e0eff; 
    }
 
  }
  .submitBtn{
    background-color: #997af0;
    color: #fff;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: all 0.5s ease-in-out;
    &:hover {
      background-color: #4e0eff;
    }
  }
  
`
