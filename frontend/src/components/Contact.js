import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import ErrorMessage from "./ErrorMessage";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Contact = () => {
  const history = useHistory()

  const [emailSubscribe , setEmailSubscribe] = useState("")
  const [Error , setError] = useState(null);
  const handleChanage = (e)=>{
    setEmailSubscribe(e.target.value)
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()

    try{
      await axios.post("http://localhost:5000/mailsubscribe",{
        emailSubscribe
      })
      setEmailSubscribe("")
      history.push('/')

      
    }catch(err){
      setError(err.response.data.message)
    }
  }

  return (
    <Wrapper>
      <div className="section-center">
      <h3>Join our newsletter DariDeco.</h3>
      { Error ? (<><ErrorMessage message={Error} handleDone={setError}/></>) : null}
        <div className="content">
          <p>
            Thus, you will be updated and get our news.  <br />
            Stay Connected! 

          </p>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="emailSubscribe"
              className="form-input"
              placeholder="enter email"
              value={emailSubscribe}
              onChange={handleChanage}
            />
            <button type="submit" className="submit-btn">
              subscribe
            </button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  padding: 5rem 0;
  h3 {
    text-transform: none;
  }
  p {
    line-height: 2;
    max-width: 45em;
    color: var(--clr-grey-5);
  }
  .contact-form {
    width: 90vw;
    max-width: 500px;
    display: grid;
    grid-template-columns: 1fr auto;
  }

  .form-input,
  .submit-btn {
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: 2px solid var(--clr-black);
  }
  .form-input {
    border-right: none;
    color: var(--clr-grey-3);
    border-top-left-radius: var(--radius);
    border-bottom-left-radius: var(--radius);
  }
  .submit-btn {
    border-top-right-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
  }
  .form-input::placeholder {
    color: var(--clr-black);
    text-transform: capitalize;
  }
  .submit-btn {
    background: var(--clr-primary-5);
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    cursor: pointer;
    transition: var(--transition);
    color: var(--clr-black);
  }
  .submit-btn:hover {
    color: var(--clr-white);
  }
  @media (min-width: 992px) {
    .content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 8rem;
      margin-top: 2rem;
    }
    p {
      margin-bottom: 0;
    }
  }
  @media (min-width: 1280px) {
    padding: 15rem 0;
  }
`;

export default Contact;
