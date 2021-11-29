import React, { useEffect, useState } from 'react';
import { useApiSlow } from '../hooks/useApiSlow';
import "../styles/main.css";
import { keys } from '../utils/env';
import { ErrorIndicator } from './ErrorIndicator';
import { LoadingIndicator } from './LoadingIndicator';

export const ArtGallery = () => {

  const [pictures, setPictures] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorOccured, setErrorOccured] = useState(false)
  const searchWord = "brickwall"

  const { apiIsSlow } = useApiSlow()

  useEffect(() => {
    fetch(`${keys.flickrEndpoint}&api_key=${keys.secret}&tags=${searchWord}&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(data => {
        setIsLoading(false)
        setPictures(data.photos.photo)
      })
      .catch(error => {
        console.log(error)
        setIsLoading(false)
        setErrorOccured(true)
      })
  }, [])

  if (isLoading) {
    return (
      <LoadingIndicator slowLoading={apiIsSlow} />
    )
  }
  if (errorOccured) {
    return (
      <ErrorIndicator errorMsg='oh no, it failed! Try again!' />
    )
  } else {
    return (
      <div className='body'>
        <main className='main'>
          <div className='photoContainer'>
            {pictures.map((bild, key) => (
              <img key={key} className='photo' src={`https://live.staticflickr.com/${bild.server}/${bild.id}_${bild.secret}.jpg`} />
            ))}
          </div>
        </main>
      </div>
    )
  }
}
