import { useState } from 'react';
import './Cadastro.css'
//import InputSenha from '../../components/input-senha/InputSenha';

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  return (
    <div className="cadastro">
      <div className="cadastro_container">
        <h2>Cadastro</h2>
        <form>
          <label>Nome:</label>
          <input type="text" id="nome" name="nome" required />

          <label>E-mail:</label>
          <input
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Senha:</label>
          <input
            value={senha}
            type="password"
            id="confirma-senha"
            name="confirma-senha"
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <label>Confirme a Senha:</label>
          <input
            type="password"
            id="confirma-senha"
            name="confirma-senha"
            required
          />

          <button type="submit">Cadastrar</button>
          <a className="voltar" href="/Login">
            Voltar
          </a>
        </form>
      </div>
    </div>
  );
}