import { useState } from 'react';
import './Cadastro.css';
import { useToast } from '../../components/toast/ToastContext';
import { createUser } from '../../api/user';
import { Link, useNavigate } from 'react-router-dom';

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (senha !== confirmaSenha) {
      showToast("As senhas não são iguais", "error");
      return;
    }

    const user = {
      email: email,
      senha: senha,
      nome: nome
    };

    try {
      const response = await createUser(user);
      if (response) {
        showToast("Cadastro realizado com sucesso!", "success");
        return navigate("/login");
      }
    } catch (error) {
      showToast(
        error.response?.data?.error || "Erro ao fazer cadastro. Tente novamente.",
        "error"
      );
    }
  };

  return (
    <div className="cadastro">
      <div className="cadastro_container">
        <h2>Cadastro</h2>
        <form>
          <label>Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          
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
            id="senha"
            name="senha"
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <label>Confirme a Senha:</label>
          <input
            value={confirmaSenha}
            type="password"
            id="confirma-senha"
            name="confirma-senha"
            onChange={(e) => setConfirmaSenha(e.target.value)}
            required
          />
          <button type="submit" onClick={handleCadastro}>
            Cadastrar
          </button>
          <Link className="voltar" to="/login">
            Voltar
          </Link>
        </form>
      </div>
    </div>
  );
}
