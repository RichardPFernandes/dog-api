import React, { useEffect } from "react";
import "./Toast.css";

export default function Toast({ message, type, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 3000); // Fecha o toast automaticamente após 3 segundos
      return () => clearTimeout(timer); // Limpa o timer ao desmontar
    }
  }, [message, onClose]);

  if (!message) return null; // Não renderiza nada se não houver mensagem

  return (
    <div className={`toast ${type}`}>
      <p>{message}</p>
    </div>
  );
}
