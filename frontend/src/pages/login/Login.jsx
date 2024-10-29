import { useState, useContext } from 'react';
import './Login.css'
import InputSenha from '../../components/input-senha/InputSenha';
import { loginUser } from '../../api/user';
import { AuthContext } from '../../auth/Context';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, senha);
      if (response.token) {
        login(response.token);
        return navigate('/');
      }
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
          <button type="submit" onClick={handleLogin}>Entrar</button>
        </form>
      </div>
    </div>
  );
}