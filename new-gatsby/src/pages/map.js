import * as React from "react"
import {AzureMap, AzureMapsProvider, AzureMapPopup} from 'react-azure-maps'
import {AuthenticationType} from 'azure-maps-control'
import styled from 'styled-components'
import { readToEmotionContainer } from '@lib/emotionContainer'
import { useState, useEffect } from 'react'
import { Link } from "gatsby"

const option = {
  authOptions: {
      authType: AuthenticationType.subscriptionKey,
      subscriptionKey: 'BoTVzUuM7aQCPMAAtfDWGkNci2eKKFaAjdHaX4Zkwa4' // Your subscription key
  },
  center: [139.7005319, 35.6048821],
  zoom: 10,
}

// ref: https://qiita.com/7note/items/3b640d031e83f82a81c1
const Heart = styled.div`
  width: 30px;
  height: 30px;
  position: relative;

  &::before,
  &::after {
    content: "";
    width: 50%;
    height: 80%;
    background: ${props => props.isPositive ? '#E0548E' : '#5dadec'};
    border-radius: 25px 25px 0 0;
    display: block;
    position: absolute;
  }
  &::before {
    transform: rotate(-45deg);
    left: 14%;
  }
  &::after {
    transform: rotate(45deg);
    right: 14%;
  }
`
const StyledAzureMapPopup = styled(AzureMapPopup)`
> .popup-content-container {
  box-shadow: none !important;
}
`
// styles
const pageStyles = {
  color: "#232129",
  padding: 0,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

const Marker = ({lat, lon, isPositive, doc}) => {
  console.log(lat, lon, isPositive, doc);
  return (
    <StyledAzureMapPopup
      isVisible={true}
      boxShadow={'none'}
      options={{
        position: [lat, lon],
        closeButton: false,
        fillColor: 'transparent',
        boxShadow: 'none',
        style:{
          boxShadow: 'none'
        }
      }}
      popupContent={
        <Heart isPositive={isPositive} />
      }
      style={{
        boxShadow: 'none'
      }}
    />  
  )
}

// markup
const IndexPage = () => {
  const [markers, setMarkers] = useState(undefined);
  useEffect(async () => {
    const items = await readToEmotionContainer()
    const newMakers = items.map(item => {
      return (<Marker lat={item.Lng} lon={item.Lat} isPositive={item.OverallSentiment!="negative"} doc={item.DocumentText}/>)
    })
    setMarkers(newMakers)
  }, []);

  return (
    <main style={pageStyles}>
      <div>
        {/* <button onClick={setlatlon}>readEmotion</button> */}
        {/* <div>
          latitude(緯度): {position.latitude}
          <br />
          longitude(経度): {position.longitude}
        </div> */}
      </div>

      <AzureMapsProvider>
        <div style={{ height: '600px', width: "100%" }}>
          <AzureMap options={option}>
            {
              markers
            }
          </AzureMap>
        </div>
      </AzureMapsProvider>
      <div class="container h-100">
        <div class="row align-items-end h-25" style={{margin: "10px"}}>
          <Link to="/speech_to_text" style={{backgroundColor: '#FAFDC5', color: 'black'}} className='btn button button--link me-2' role="button">
              さあ！<br />
              会話を始めよう
          </Link>
        </div>
      </div>
    </main>
  )
}

export default IndexPage
