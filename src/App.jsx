import './App.css'
import dogHome from './assets/dogHome.png'

function App() {

  return (
    <div className="app">
      <header className="app_header">
        <h1>Você ama cachorros?</h1>
      </header>
      <main className="app_main">
        <img src={dogHome} alt="dog" />
        <p>
          Aqui você pode demonstrar seu amor por cachorros,
        </p>
        <p>
          Você pode ver fotos de cachorros, adicionar cachorros aos favoritos e muito mais.
        </p>
        <button className="app_button">Clique aqui para começar</button>
      </main>
    </div>
  )
}

export default App
