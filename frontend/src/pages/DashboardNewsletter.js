import React, { useEffect, useState }  from "react";
import styled from "styled-components";
import { ErrorMessage, PageHero } from "../components";
import DashboardSideBar from "../components/DashboardSideBar";
import axios from "axios";



const DashboardNewsletter = () => {
  const [Error , setError] = useState(null);

  const [mailObject, setmailObject] = useState("");
  const mailObjectHandler = (e)=>{
    setmailObject(e.target.value);
  }

  const [mailMessage, setmailMessage] = useState("");
  const mailMessageHandler = (e)=>{
    setmailMessage(e.target.value);
  }
  //Form Submit
  const handleSubmit = async (e)=>{
    e.preventDefault()

    try{
      await axios.post("http://localhost:5000/mailsubscribe/send", {
        object : mailObject,
        message : mailMessage
      })
      setError(null)
      setmailObject("")
      setmailMessage("")
      window.alert("Message Sent !")
    }catch(e){
      setError(e.response.data.message)
    }
  }

  return (
    <main>
      <PageHero title="Dashboard" />
      <Wrapper className="page section section-center">
        <DashboardSideBar />
        <article style={{ width : "100%"}}>
          <div className="title">
            <h2>newsletter</h2>
            <div className="underline"></div>
          </div><br />
          { Error ? (<><ErrorMessage message={Error} handleDone={setError}/><br /></>) : null}
          <form encType="multipart/form-data" onSubmit={handleSubmit} style={{justifyContent : "center", alignItems : "center", width : "100%", gap : "1rem"}}>
            <div style={{ flexGrow : 1}}>

                <label htmlFor="mailObject">Mail Object : </label>
                <input
                type="text"
                name="mailObject"
                placeholder="Mail Object"
                className="signup-input"
                value={mailObject}
                onChange={mailObjectHandler}
                required
                style={{ width : "100%"}}
                />
                
                <label htmlFor="mailMessage">Mail Message : </label>
                <textarea rows={10}
                name="mailMessage"
                placeholder="Mail Message"
                className="signup-input"
                value={mailMessage}
                onChange={mailMessageHandler}
                required
                />

            </div>
            <button type="submit" className="addButton">Send <i class="fa-solid fa-paper-plane-top"></i></button>
          </form>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: flex;
  gap: 4rem;
  .errorMessage{
    background-color : #C0392B ;
    width : 100%;
    padding : 0.5rem 1rem;
    color : white;
    border-radius : 5px;
    text-align : center ;
    font-size : 1.15rem;
    margin-top: 1rem;
  }
  .infoMessage{
    background-color : #F7DC6F ;
    width : 100%;
    padding : 0.5rem 1rem;
    color : white;
    border-radius : 5px;
    text-align : center ;
    font-size : 1.15rem;
    margin-top: 1rem;
  }
  select {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.5rem;
    width : 100%;
  }
  .addButton{
    background-color : var(--clr-grey-5);
    color : white;
    font-size : 1rem;
    padding : 0.5rem 1.5rem;
    margin: 1rem auto;
    border : none;
    cursor : pointer;
    border-radius : 5px;
  }
  .signup-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
    width: 100%;
  }
  label{
    color: var(--clr-grey-4);
    line-height: 2;
  }

  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
    opacity:0;
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
`;
export default DashboardNewsletter;
