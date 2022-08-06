import React from 'react';
import styled from "styled-components";

const Welcom = ({currentUser}) => {

    return (
        <Container>
            <h1>
                Welcom , <span>{currentUser.userName}</span>
            </h1>
            <h3>Please select a chat to start messaging</h3>
        </Container>
    );
};
const Container = styled.div`
    display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  color: white;
  span {
    color: #4e00ff;
  }
`
export default Welcom;