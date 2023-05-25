import { useState } from 'react'
import './index.css'

function App() {
  const [user, setUser] = useState('')
  const [weeklyChart, setWeeklyChart] = useState()
  let [image, setimage] = useState()

  const API_KEY = '01013d723c1a151531d31395e6745113'
  let displayForm = true

  const getWeeklyChart = async () => {
    const res = await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=user.getweeklyalbumchart&user=${user}&api_key=${API_KEY}&format=json&limit=12`
    )
    const data = await res.json()
    setWeeklyChart(data)
  }
  console.log(weeklyChart)

  async function handleSubmit(e) {
    e.preventDefault()
    await getWeeklyChart()
    displayForm = false
  }

  async function generateImage(name, artist) {
    const res = await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${API_KEY}&artist=${artist}&album=${name}&format=json`
    )
    const data = await res.json()
    setimage(data.album.image[3]['#text'])
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Digite o nome do usuário lastFM</h1>
        <div className="card">
          <input
            type="text"
            id="userName"
            placeholder="nome de usuário"
            onChange={e => setUser(e.target.value)}
            value={user}
          />
          <button id="usersend" type="submit">
            Enviar
          </button>
        </div>
      </form>
      <div id="content-container">
        {weeklyChart ? (
          weeklyChart.weeklyalbumchart.album.map((e, index) => (
            <div className="album-card">
              <img
                onLoad={generateImage(e.name, e.artist['#text'])}
                src={image}
              />

              <p>{e.name}</p>
              <p>{e.artist['#text']}</p>
              <p>{e.playcount}</p>
            </div>
          ))
        ) : (
          <p>Undefined</p>
        )}
      </div>
    </>
  )
}

export default App
