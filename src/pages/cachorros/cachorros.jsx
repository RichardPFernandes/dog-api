import { useState } from 'react'
import './cachorros.css'
export default function Cachorros() {

  const [cachorros] = useState([
    {
      id: 1,
      nome: 'Rex',
      idade: 3,
      raca: 'Vira-lata',
      foto: 'https://images.unsplash.com/photo-1560807707-9b1d0b3a8f1f'
    },
    {
      id: 2,
      nome: 'Tobias',
      idade: 2,
      raca: 'Vira-lata',
      foto: 'https://images.unsplash.com/photo-1560807707-9b1d0b3a8f1f'
    },
    {
      id: 3,
      nome: 'Luna',
      idade: 1,
      raca: 'Vira-lata',
      foto: 'https://images.unsplash.com/photo-1560807707-9b1d0b3a8f1f'
    }
  ])

    return (
      <div className="cachorros">
        <header className="cachorros_header">
          <h1>Cachorros</h1>
        </header>
        <main className="cachorros_main">
          {cachorros.map(cachorro => (
            <div key={cachorro.id} className="cachorro">
              <img src={cachorro.foto} alt={cachorro.nome} />
              <h2>{cachorro.nome}</h2>
              <p>Idade: {cachorro.idade} ano(s)</p>
              <p>Raça: {cachorro.raca}</p>
            </div>
          ))}
        </main>
      </div>
    )
}