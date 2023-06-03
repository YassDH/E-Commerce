import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ErrorMessage = ({ message , handleDone }) => {
  const [show, setShow] = useState(true)
  useEffect(() => {
    const timeId = setTimeout(() => {
      
      handleDone(null)
      setShow(false)
    }, 4000)
    return () => {
      clearTimeout(timeId)
    }
  }, []);
  return (
    <Wrapper>
      {show ? (<div className="errorMessage">{message}</div>) : null}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .errorMessage{
    background-color : #C0392B ;
    padding : 0.5rem 1rem;
    color : white;
    border-radius : 5px;
    text-align : center ;
    font-size : 1.15rem
  }
`;

export default ErrorMessage;
