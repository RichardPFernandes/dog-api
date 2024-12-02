import { useContext, useEffect, useState } from 'react';
import './cachorros.css';
import Card from '../../components/card/Card';
import { deleteDog, getDogs, updateDog } from '../../api/dog';
import Button from '../../components/Button/Button';
import Modal from '../../components/modal/modal';
import { AuthContext } from '../../auth/Context';

export default function Cachorros() {
  const [cachorros, setCachorros] = useState([]);
  const [selectedDog, setSelectedDog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [raca, setRaca] = useState('');
  const [urlImagem, setUrlImagem] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [cardId, setCardId] = useState('');
  const { role } = useContext(AuthContext);

  const fetchCachorros = async () => {
    const cachorrosResponse = await getDogs();
    setCachorros(cachorrosResponse.results);
  };

  useEffect(() => {
    fetchCachorros();
  }, []);

  const openModal = (cachorro) => {
    setSelectedDog(cachorro);
    setRaca(cachorro.raca);
    setUrlImagem(cachorro.url_imagem);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDog(null);
    setRaca('');
    setUrlImagem('');
    setIsEditing(false);
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Atualizando cachorro:', { id: selectedDog.id, raca, urlImagem });
    await updateDog(selectedDog.id, {raca, url_imagem: urlImagem});
    fetchCachorros();
    closeModal();
  };

  const handleDelete = async () => {
    console.log(`Excluindo cachorro ID: ${selectedDog.id}`);
    await deleteDog(selectedDog.id);
    fetchCachorros();
    closeModal();
  };

  return (
    <div className="cachorros">
      <main className="cachorros_main">
        {cachorros.map(cachorro => (
          <div key={cachorro.id} onClick={() => openModal(cachorro)}>
            <Card cachorro={cachorro} />
          </div>
        ))}
        {role === 'admin' && (<Button onChange={fetchCachorros} />)}
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        raca={raca}
        setRaca={setRaca}
        urlImagem={urlImagem}
        setUrlImagem={setUrlImagem}
        isEditing={isEditing}
        cardId={selectedDog ? selectedDog.id : ''}
      />
    </div>
  );
}
