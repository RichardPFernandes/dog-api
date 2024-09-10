import { FaHeart, FaRegHeart } from "react-icons/fa";
import './Card.css'
import { useState } from 'react';

export default function Card({ cachorro }) {
  const [favorito, setFavorito] = useState(cachorro.favorito);

  function adicionarFavorito() {
    setFavorito(!favorito)
  }

  return (
    <div className="cachorro">
      <div className="cachorro_info">
        <button className="coracao" onClick={adicionarFavorito}>
        {favorito ? (
        <FaHeart
          color="red"
        />
      ) : (
        <FaRegHeart
          color="red"
        />
      )}
        </button>
        
        <img src={cachorro.image.url} alt={cachorro.name} />
        <p>Origem: {cachorro.origin}</p>
        <p>Raça: {cachorro.name}</p>
      </div>
      <div className="cachorro_buttons">
        <button className='descricao' onClick={() => window.location.href = '/descricao'}>Detalhes</button>
      </div>
    </div>
  )
}