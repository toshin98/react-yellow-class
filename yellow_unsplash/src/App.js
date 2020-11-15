import React, {useState,useEffect} from 'react';
import {Heading} from './components/Heading';
import {Loader} from './components/Loader';

import axios from 'axios';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import Lightbox from 'react-image-lightbox';
import "react-image-lightbox/style.css";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"


const GlobalStyle= createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body{
    font-family: sans-serif;
  }
`;

const Img= styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const WrapperImage= styled.section`

  max-width: 70rem;
  margin: 4rem auto;
  display: grid;
  grid-gap: 2em;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows:300px;

`;

function App() {
  const [images,setimages]=useState([]);
  const [simages,setsimages]=useState([]);
  const [photoindex, setphotoindex]=useState(10);
  const [isOpen, setisOpen]=useState(false);


  const fetchImages=()=>{
    const apiRoot="https://api.unsplash.com";
    axios
      .get(`${apiRoot}/photos/random?client_id=cTr0RAtXLWXrBQrB1HlM3OWDQzV-5bbRaybD9tYmMDk&count=15`)
      .then(res=> {
        setimages([...images, ...res.data]);
        var newar=[];
        res.data.map((image)=>(
          newar.push(image.urls.regular)
        ));
        setsimages([(simages+newar).split(",")])

   
    })
  }

  const imageClick=(index)=>{
    setphotoindex(index);
    setisOpen(true);

  }
  
  
  useEffect(()=>{
    fetchImages();
  },[])
  
  return (
    <div className="App" style={{backgroundColor:'rgb(255,196,12)'}}>
      <Heading/>
      <GlobalStyle/>
      <div className="App">
      <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore={true}
        loader={<Loader/>}

      >
      
      <ResponsiveMasonry
                columnsCountBreakPoints={{350: 2, 750: 3, 900: 4}}
            >
                <Masonry>
                {images.map((image,index)=>(
        <div>
        <a href="#"><Img src={image.urls.thumb} key={image.id} style={{padding: '10px',borderRadius: '30px'}} alt={image.alt_description} label={index} onClick={() => imageClick(index)} /></a>
      <p style={{fontSize:13,textAlign:'center',fontFamily:"sans-serif"}}>{image.alt_description.charAt(0).toUpperCase() + image.alt_description.slice(1)}</p>
        {isOpen && (
          <Lightbox
            mainSrc={simages[0][photoindex]}
            nextSrc={simages[0][(photoindex + 1) % simages[0].length]}
            prevSrc={simages[0][(photoindex + simages[0].length - 1) % simages[0].length]}
            onCloseRequest={() => setisOpen(false)}
            onMovePrevRequest={() =>
              setphotoindex((photoindex + simages[0].length - 1) % simages[0].length)
              
            }
            onMoveNextRequest={() =>
              setphotoindex((photoindex + 1) % simages[0].length)
              
            }
          />
        )}
        </div>
      ))}
                </Masonry>
            </ResponsiveMasonry>

      </InfiniteScroll>
      </div>
    </div>
  );
}

export default App;
