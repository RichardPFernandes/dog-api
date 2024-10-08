import { useState } from 'react';
import './Login.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import InputSenha from '../../components/input-senha/InputSenha';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  return (
    <div className="login">
      <div className="login_container">
        <h1>Login</h1>
        <form>
          <label htmlFor="email">Email</label>
          <input className="email" type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputSenha senha={senha} setSenha={setSenha} />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}