import { useState } from 'react'
import './index.css'
import CardAlbum from './CardAlbum'

function App() {
  const [user, setUser] = useState('')
  const [weeklyChart, setWeeklyChart] = useState()

  const API_KEY = '01013d723c1a151531d31395e6745113'

  const getWeeklyChart = async () => {
    const res = await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=user.getweeklyalbumchart&user=${user}&api_key=${API_KEY}&format=json&limit=15`
    )
    const data = await res.json()
    setWeeklyChart(data)
  }
  console.log(weeklyChart)

  async function handleSubmit(e) {
    e.preventDefault()
    await getWeeklyChart()
    document.getElementById('form').style.display = 'none'
    document.getElementById('content-container').style.display = 'flex'
  }

  return (
    <>
      <form onSubmit={handleSubmit} id="form">
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
          weeklyChart.weeklyalbumchart.album.map(e => (
            <CardAlbum
              name={e.name}
              artist={e.artist['#text']}
              playcount={e.playcount}
            />
          ))
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </>
  )
}

export default App
