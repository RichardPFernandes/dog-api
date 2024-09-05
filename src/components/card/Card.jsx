import { BiSolidDownvote, BiSolidUpvote } from 'react-icons/bi'
import { FaRegHeart } from "react-icons/fa";
import './Card.css'

export default function Card({ cachorro }) {
  return (
    <div className="cachorro">
      <div className="cachorro_info">
        <div className="coracao">
          <FaRegHeart color='red'/>
        </div>
        
        <img src={cachorro.image.url} alt={cachorro.name} />
        <p>Origem: {cachorro.origin}</p>
        <p>Raça: {cachorro.name}</p>
      </div>
      <div className="cachorro_buttons">
        <button><BiSolidUpvote /></button>
        <button><BiSolidDownvote /></button>
      </div>
    </div>
  )
}