import { useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import './Button.css';

export default function Button() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [breed, setBreed] = useState('');
  const [lifeExpectancy, setLifeExpectancy] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [cardId, setCardId] = useState('');

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      console.log(`Atualizando Card ${cardId}:`, { breed, lifeExpectancy });
    } else {
      console.log("Cadastrando:", { breed, lifeExpectancy });
    }
    resetForm();
  };

  const resetForm = () => {
    setBreed('');
    setLifeExpectancy('');
    setCardId('');
    setIsEditing(false);
    toggleModal();
  };

  const handleEdit = () => {
    setCardId('1');
    setIsEditing(true);
    toggleModal();
  };

  const handleDelete = () => {
    console.log(`Excluindo Card ${cardId}:`, { breed });
    toggleDeleteModal();
  };

  return (
    <>
      <div className="button" onClick={toggleModal}>
        <div className="onda"></div>
        <IoIosAddCircleOutline className="icon" />
      </div>
      
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={resetForm}>&times;</span>
            <h3>{isEditing ? 'Editar Card' : 'Adicionar um Novo Card'}</h3>
            <form onSubmit={handleSubmit}>
              {isEditing && <p>ID: {cardId}</p>}
              <label>
                Raça:
                <input
                  type="text"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  required
                />
              </label>
              <label>
                Expectativa de Vida:
                <input
                  type="number"
                  value={lifeExpectancy}
                  onChange={(e) => setLifeExpectancy(e.target.value)}
                  required
                />
              </label>
              <button type="submit">{isEditing ? 'Atualizar' : 'Cadastrar'}</button>
              <button type="button" className="alterar-button" onClick={handleEdit}>
                Alterar
              </button>
              <button type="button" className="delete-button" onClick={toggleDeleteModal}>
                Excluir
              </button>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleDeleteModal}>&times;</span>
            <h2>Excluir Card</h2>
            <p>Tem certeza que deseja excluir o card?</p>
            <p>ID: {cardId}</p>
            <p>Raça: {breed}</p>
            <button onClick={handleDelete}>Confirmar Exclusão</button>
            <button onClick={toggleDeleteModal}>Cancelar</button>
          </div>
        </div>
      )}
    </>
  );
}
