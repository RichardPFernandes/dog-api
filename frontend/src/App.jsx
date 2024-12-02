import { useNavigate } from 'react-router-dom'
import './App.css'
import dogHome from './assets/dogHome.png'
import { useContext } from 'react';
import { AuthContext } from './auth/Context';
import { useToast } from './components/toast/ToastContext';

function App() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { showToast } = useToast();

  const comecar = () => {
    if (token != null) {
      navigate('/cachorros');
    } else {
      showToast('Necessário estar logado para acessar', "error");
    }
  }

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
        <button className="app_button" onClick={comecar}>Clique aqui para começar</button>
      </main>
    </div>
  )
}

export default App
