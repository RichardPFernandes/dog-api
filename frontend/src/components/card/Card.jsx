import { FaHeart, FaRegHeart } from "react-icons/fa";
import './Card.css'
import { useState } from 'react';
import DogApiService from '../../service/dogApi';

export default function Card({ cachorro }) {
  const [favorito, setFavorito] = useState(cachorro.favorito);
  console.log(cachorro)
  function adicionarFavorito() {
    setFavorito(!favorito)
    DogApiService().criarFavorito({
      image_id: cachorro.image.id,
      sub_id: 'user-1234'
    })
  }

  return (
    <div className="cachorro">
      <div className="cachorro_info">
        <button className="coracao" onClick={adicionarFavorito}>
          {favorito ? <FaHeart color="red" /> : <FaRegHeart color="red" />}
        </button>

        <img src={cachorro.url_imagem} alt={cachorro.name} />
        <p>Espectativa: {cachorro.expec_vida ? `${cachorro.expec_vida.split('year')[0]} anos` : 'Desconhecida'}</p>
        <p>Raça: {cachorro.raca}</p>
      </div>
    </div>
  );
}