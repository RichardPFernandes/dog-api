import { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function InputSenha({ senha, setSenha }) {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  return (
    <div className="input-senha">
      <label htmlFor="senha">Senha</label>
      <input
        type={mostrarSenha ? "text" : "password"}
        id="senha"
        name="senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <div className="input-senha-icon">
        {mostrarSenha ? (
          <FaEye onClick={() => setMostrarSenha(false)} />
        ) : (
          <FaEyeSlash onClick={() => setMostrarSenha(true)} />
        )}
      </div>
    </div>
  );
}