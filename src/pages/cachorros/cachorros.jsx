import { useEffect, useState } from 'react'
import './cachorros.css'
import Card from '../../components/card/Card'
export default function Cachorros() {

  const [cachorros, setCachorros] = useState([])

  useEffect(() => {
    fetch('https://api.thedogapi.com/v1/breeds?api_key=live_XjiMXsal2iUDs26Um84wLBtGkMWl8tJbkOJPr4ZUEw7ppBP9ScLj907q4uRrdClj&limit=10')
      .then(response => response.json())
      .then(data => setCachorros(data))
  }, [])
    return (
      <div className="cachorros">
        <main className="cachorros_main">
          {cachorros.map(cachorro => (
            <Card key={cachorro.id} cachorro={cachorro} />
          ))}
        </main>
      </div>
    )
}