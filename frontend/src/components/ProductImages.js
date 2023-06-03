import React, { useState } from "react";
import { FaMailBulk } from "react-icons/fa";
import styled from "styled-components";

const ProductImages = ({ image }) => {
  return (
    <Wrapper>
      <img src={"http://localhost:5000/product/productsImages/"+image} alt="main" className="main" />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: 0.75rem;
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
    }
  }
  .active {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
    transform: scale(1.1);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`;

export default ProductImages;
