import React from 'react'
import styled from 'styled-components'

const Header= styled.header`
  max-width: 70rem;
  margin: 0 auto;
  padding-top: 2rem;
  text-align: center;
`;

const H1=styled.h1`
  font-family: arial;
  margin-bottom:1em;
  background-color: rgb(255,196,12);
`;

export const Heading = () => {
    return (
        <Header>
            <H1>Yellow Class Gallary</H1>
            <p style={{paddingBottom: '10px'}}>Your child is Gifted. Do YOU believe that?</p>
            <p style={{paddingBottom: '50px'}}>Try everything that interests your child</p>

        </Header>
    )
}
