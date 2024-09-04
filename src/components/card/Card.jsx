import { BiSolidDownvote, BiSolidUpvote } from 'react-icons/bi'
import './Card.css'

export default function Card({ cachorro }) {
  return (
    <div className="cachorro">
      <div className="cachorro_info">
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