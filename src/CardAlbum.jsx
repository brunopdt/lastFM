import React, { useState } from 'react'
import placeholderImg from './assets/placeholder.png'
import { IoOpenOutline } from 'react-icons/io5'

const CardAlbum = props => {
  const [img, setImg] = useState('')
  generateImage(props.name, props.artist)
  let [alterado, setalterado] = useState(false)

  return (
    <div className="album-card">
      <img src={img} className={alterado ? 'regular' : 'placeholder'} />
      <div className="flex-division">
        <div className="album-info">
          <p className="nome-album">{props.name}</p>
          <p className="artista-album">
            {' '}
            <span className="extra-text">por </span>
            {props.artist}
          </p>
          <p className="stream-album">
            {props.playcount} <span className="extra-text"> Streams</span>
          </p>
        </div>
        <a target="_blank" href={props.url}>
          <IoOpenOutline />
        </a>
      </div>
    </div>
  )

  async function generateImage(name, artist) {
    const res = await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${
        import.meta.env.VITE_API_KEY
      }&artist=${artist}&album=${name}&format=json`
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
