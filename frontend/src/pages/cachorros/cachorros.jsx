import { useEffect, useState } from 'react'
import './cachorros.css'
import Card from '../../components/card/Card'
import { getDogs } from '../../api/dog'

export default function Cachorros() {

  const [cachorros, setCachorros] = useState([])

  useEffect(() => {
    const fetchCachorros = async () => {
      const cachorros = await getDogs();
      setCachorros(cachorros);
    } 
    fetchCachorros()
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