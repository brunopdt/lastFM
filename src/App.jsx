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
        <div className="background">
          <div className="form-card">
            <h1 className="form-title">Olá! 🪕🎺</h1>

            <h2 className="form-subtitle">
              Escreva o nome de um perfil do lastFM para ver os álbuns mais
              ouvidos da semana e poder mostrar pros seus amigos quem tem bom
              gosto de verdade!
            </h2>

            <div className="auth">
              <div className="auth-label">Nome</div>
              <input
                className="auth-input"
                id="userName"
                name="username"
                onChange={e => setUser(e.target.value)}
                value={user}
                autocomplete="off"
              />
              <button className="auth-button" id="usersend" type="submit">
                Entrar
              </button>
            </div>
          </div>
        </div>
      </form>
      <div id="content-container">
        {weeklyChart ? (
          weeklyChart.weeklyalbumchart.album.map(e => (
            <CardAlbum
              name={e.name}
              artist={e.artist['#text']}
              playcount={e.playcount}
              url={e.url}
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
