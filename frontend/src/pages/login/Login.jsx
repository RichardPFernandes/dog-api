import { useState } from 'react';
import './Login.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import InputSenha from '../../components/input-senha/InputSenha';
import { loginUser } from '../../api/user';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, senha);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="login">
      <div className="login_container">
        <h1>Login</h1>
        <form>
          <label htmlFor="email">Email</label>
          <input className="email" type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputSenha senha={senha} setSenha={setSenha} />
          <button type="submit" onClick={login}>Entrar</button>
        </form>
      </div>
    </div>
  );
}