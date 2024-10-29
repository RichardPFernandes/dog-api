import { useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import './Button.css';
import { createDog } from '../../api/dog';
import Modal from '../modal/modal';

export default function Button({onChange}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [raca, setRaca] = useState('');
  const [lifeExpectancy, setLifeExpectancy] = useState('');
  const [urlImagem, setUrlImagem] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [cardId, setCardId] = useState('');

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // const toggleDeleteModal = () => {
  //   setIsDeleteModalOpen(!isDeleteModalOpen);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Cadastrando:", { raca, url_imagem: urlImagem });
    await createDog({ raca, url_imagem: urlImagem });
    onChange()
    resetForm();
  };

  const resetForm = () => {
    setRaca('');
    setLifeExpectancy('');
    setCardId('');
    setIsEditing(false);
    toggleModal();
  };

  return (
    <>
      <div className="button" onClick={toggleModal}>
        <div className="onda"></div>
        <IoIosAddCircleOutline className="icon" />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={resetForm}
        onSubmit={handleSubmit}
        raca={raca}
        setRaca={setRaca}
        urlImagem={urlImagem}
        setUrlImagem={setUrlImagem}
        isEditing={isEditing}
        cardId={cardId}
      />
      
      {/* {isDeleteModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleDeleteModal}>&times;</span>
            <h2>Excluir Card</h2>
            <p>Tem certeza que deseja excluir o card?</p>
            <p>ID: {cardId}</p>
            <p>Raça: {raca}</p>
            <button onClick={handleDelete}>Confirmar Exclusão</button>
            <button onClick={toggleDeleteModal}>Cancelar</button>
          </div>
        </div>
      )} */}
    </>
  );
}
