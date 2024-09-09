import { useEffect, useState } from 'react'
import './cachorros.css'
import Card from '../../components/card/Card'
import DogApiService from '../../service/dogApi'
export default function Cachorros() {

  const [cachorros, setCachorros] = useState([])

  useEffect(() => {
    DogApiService()
      .getCachorros()
      .then(data => {
        setCachorros(data)
      })
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