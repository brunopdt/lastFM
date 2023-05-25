import React, { useState } from 'react'

const CardAlbum = props => {
  const [img, setImg] = useState('')
  generateImage(props.name, props.artist)

  return (
    <div className="album-card">
      <img src={img} />
      <p>{props.name}</p>
      <p>{props.artist}</p>
      <p>{props.playcount} Streams</p>
    </div>
  )

  async function generateImage(name, artist) {
    const res = await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=01013d723c1a151531d31395e6745113&artist=${artist}&album=${name}&format=json`
    )
    const data = await res.json()
    console.log(data)
    setImg(data.album.image[5]['#text'])
  }
}

export default CardAlbum
