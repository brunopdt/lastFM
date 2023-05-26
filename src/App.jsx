import { useState } from 'react'
import './css/index.css'
import CardAlbum from './CardAlbum'
import Navbar from './Navbar'
import { VscDebugRestart } from 'react-icons/vsc'

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
    document.getElementById('navbar').style.position = 'relative'
  }

  return (
    <>
      <Navbar id="navbar" />
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
                autoComplete="off"
              />
              <button className="auth-button" id="usersend" type="submit">
                Entrar
              </button>
            </div>
          </div>
        </div>
      </form>
      <div id="content-container">
        <div id="text-semana">
          <h1>
            Semana de
            <span id="semana-user"> {user} </span>
            no lastFM:
          </h1>
          <button
            id="restart"
            className="auth-button"
            onClick={() => {
              setUser('')
              setWeeklyChart('')
              document.getElementById('form').style.display = 'block'
              document.getElementById('content-container').style.display =
                'none'
              document.getElementById('navbar').style.position = 'absolute'
              window.location.reload()
            }}
          >
            <VscDebugRestart /> Tentar novamente
          </button>
        </div>

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
