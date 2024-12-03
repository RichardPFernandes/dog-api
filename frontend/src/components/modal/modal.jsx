import React from 'react';
import './modal.css';

export default function Modal({
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  raca,
  setRaca,
  urlImagem,
  setUrlImagem,
  isEditing,
  cardId
}) {
  
  if (!isOpen) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h3>{isEditing ? 'Editar Card' : 'Adicionar um Novo Card'}</h3>
        <form onSubmit={onSubmit}>
          {isEditing && <p>ID: {cardId}</p>}
          <label>
            Raça:
            <input
              type="text"
              value={raca}
              onChange={(e) => setRaca(e.target.value)}
              required
            />
          </label>
          <label>
            URL Imagem:
            <input
              type="text"
              value={urlImagem}
              onChange={(e) => setUrlImagem(e.target.value)}
              required
            />
          </label>
          <button type="submit">{isEditing ? 'Atualizar' : 'Cadastrar'}</button>
          {isEditing && (
            <>
              <button type="button" className="alterar-button" onClick={onSubmit}>
                Alterar
              </button>
              <button type="button" className="delete-button" onClick={onDelete}>
                Excluir
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
