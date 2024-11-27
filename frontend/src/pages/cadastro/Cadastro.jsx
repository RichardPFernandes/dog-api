import { useState } from 'react';
import './Cadastro.css'
import { useToast } from '../../components/toast/ToastContext';
import { createUser } from '../../api/user';
import { useNavigate } from 'react-router-dom';
//import InputSenha from '../../components/input-senha/InputSenha';

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const { showToast } = useToast();
  const navigate = useNavigate();

 const handleCadastro = async (e) => {
   e.preventDefault();
   const user = {
     email: email,
     senha: senha,
     nome: nome
  }
   try {
     const response = await createUser(user);
     if (response) {
       showToast("Cadastro realizado com sucesso!", "success");
       return navigate("/login");
     }
   } catch (error) {
     showToast(
       error.response?.data?.error || "Erro ao fazer login. Tente novamente.",
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
          <input type="text" id="nome" name="nome" required value={nome} onChange={(e) => setNome(e.target.value)}></input>

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

          <button type="submit" onClick={handleCadastro}>Cadastrar</button>
          <a className="voltar" href="/Login">
            Voltar
          </a>
        </form>
      </div>
    </div>
  );
}