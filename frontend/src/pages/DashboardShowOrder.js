import React, { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import { ErrorMessage, PageHero } from "../components";
import DashboardSideBar from "../components/DashboardSideBar";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
const DashboardShowOrder = () => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_DATA":
        return {
          data : action.payload
        };
      default:
        return state;
    }
  };
  
  const params= useParams()
  const [Error , setError] = useState(null);
  const [order , dispatch] = useReducer(reducer, { data : null});
  useEffect(async ()=>{
    try{
      const res = await axios.get(`http://localhost:5000/order/${params.id}`)
      console.log(res.data)
      dispatch({ type: "ADD_DATA", payload : res.data });

    }catch (e){
      setError(e.response.data.message)
    }
  },[])


  return (
    <main>
      <PageHero title="Dashboard" />
      <Wrapper className="page section section-center">
        <DashboardSideBar />
        <article style={{ width : "100%"}}>
          <div className="title">
            <h2>order details</h2>
            <div className="underline"></div>
          </div>
          <br />
          { Error ? (<><ErrorMessage message={Error} handleDone={setError}/><br /></>) : null}
          <div className="dataBox">
            <div className="card">
                <h3 style={{ textAlign : "center" , marginTop : "1rem"}}>Order N° {order.data?.id}</h3>
                <p>Customer : <span style={{ fontWeight : "bold"}}>{order.data?.user}</span></p>
                {order.data?.products.map((product)=>(
                  <div key={product.id} className="product-card flex">
                    <img style={{width : "25%" , borderRadius : "5px"}} src={"http://localhost:5000/product/productsImages/"+product.image} alt="" />
                    <div className="flex" style={{ flexGrow  : 1}}>
                        <p style={{ alignItems : "center" , justifyContent : "center"}}>Product : <br /> <span style={{ fontWeight : "bold"}}>{product.name}</span></p>
                        <p style={{ alignItems : "center" , justifyContent : "center"}}>Price : <br /> <span style={{ fontWeight : "bold"}}>{product.price/100}</span></p>
                        <p style={{ alignItems : "center" , justifyContent : "center"}}>Qty : <br /> <span style={{ fontWeight : "bold"}}>{product.quantity}</span></p>
                    </div>
                  </div>
                  ))}
                  <div style={{ display : "flex" , padding : "1rem", }}>
                    <div style={{ float : "left" , flexGrow : 1}}>
                      <p><span style={{ fontWeight : "bold"}}>Order Details</span></p>
                      <p>Order Date : {order.data?.date}</p>
                      <p style={{ display : "flex" , gap : "1rem"}}>Customer's Adress : <span style={{ display : "flex" , flexDirection : "column"}}><span>{order.data?.adress}</span><span> {order.data?.postCode}</span></span></p>
                    </div>
                    <div style={{ textAlign : "right"}}>
                      <p><span style={{ fontWeight : "bold"}}>Total : </span>{order.data?.price - 5.34} $</p>
                      <p><span style={{ fontWeight : "bold"}}>Shipping Fees : </span>{5.34} $</p>
                      <p><span style={{ fontWeight : "bold" , fontSize : "1.5rem"}}>Total Paid : </span>{order.data?.price} $</p>
                    </div>
                  </div>
                  
            </div>
          </div>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: flex;
  gap: 4rem;
  select {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.5rem;
    width : 100%;
  }
  .flex{
    display : flex;
    align-items : center ;
    justify-content : center ;
    gap : 1rem;
  }
  .product-card {
    border : 1px solid #CACFD2;
    width : 100%;
    border-radius : 5px;  
    background-color : #F8F9F9;
    padding : 10px;
    margin-top : 10px;
  }
  .card {
    border : 1px solid #CACFD2;
    width : 100%;
    border-radius : 5px;  
    background-color : #F2F3F4;
    padding : 20px 10px;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
`;
export default DashboardShowOrder;
