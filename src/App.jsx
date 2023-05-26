import { useState } from 'react'
import './css/index.css'
import CardAlbum from './CardAlbum'
import Navbar from './Navbar'
import { VscDebugRestart } from 'react-icons/vsc'
import logo from './assets/lastfm-logo.png'

function App() {
  const [user, setUser] = useState('')
  const [weeklyChart, setWeeklyChart] = useState()
  let limit
  const API_KEY = '01013d723c1a151531d31395e6745113'

  const getWeeklyChart = async () => {
    limit = document.querySelector('input[name = "limit"]:checked').value

    const res = await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=user.getweeklyalbumchart&user=${user}&api_key=${API_KEY}&format=json&limit=${limit}`
    )
    const data = await res.json()
    setWeeklyChart(data)
  }

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
            <h1 className="form-title">
              Olá! 🪕🎺 <img id="main-logo" src={logo} alt="logo-last-fm" />
            </h1>

            <h2 className="form-subtitle">
              Escreva o nome de um perfil do lastFM para ver os álbuns mais
              ouvidos da semana e poder mostrar pros seus amigos quem tem bom
              gosto de verdade!
            </h2>

            <div className="auth">
              <div className="auth-label">Nome de usuário</div>
              <input
                className="auth-input"
                id="userName"
                name="username"
                onChange={e => setUser(e.target.value)}
                value={user}
                autoComplete="off"
                required
              />
              <span id="radio-form-header">
                {'Quantos registros deseja ver? '}
              </span>
              <div id="radio-form">
                <span>
                  <input type="radio" name="limit" required value="5" /> 5
                </span>
                <span>
                  <input type="radio" name="limit" required value="10" /> 10
                </span>
                <span>
                  <input type="radio" name="limit" required value="15" /> 15
                </span>
                <span>
                  <input type="radio" name="limit" required value="20" /> 20{' '}
                </span>
              </div>
              <button className="auth-button" id="usersend" type="submit">
                Buscar
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
