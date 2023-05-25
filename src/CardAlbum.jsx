import React, { useState } from 'react'
import placeholderImg from './assets/placeholder.png'

const CardAlbum = props => {
  const [img, setImg] = useState('')
  generateImage(props.name, props.artist)
  let [alterado, setalterado] = useState(false)

  return (
    <div className="album-card">
      <img src={img} className={alterado ? 'regular' : 'placeholder'} />
      <p>{props.name}</p>
      <p>{props.artist}</p>
      <p>{props.playcount} Streams</p>
      <a href={props.url}>
        <button className="auth-button" id="veralbum">
          Ver álbum no lastFM
        </button>
      </a>
    </div>
  )

  async function generateImage(name, artist) {
    const res = await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=01013d723c1a151531d31395e6745113&artist=${artist}&album=${name}&format=json`
    )
    const data = await res.json()
    console.log(data)
    if (data.album.image[5]['#text'] != '') {
      setImg(data.album.image[5]['#text'])
      setalterado(true)
    } else {
      setImg(placeholderImg)
    }
  }
}

export default CardAlbum
