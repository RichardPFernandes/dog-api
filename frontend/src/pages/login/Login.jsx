import { useState, useContext } from "react";
import "./Login.css";
import InputSenha from "../../components/input-senha/InputSenha";
import { loginUser } from "../../api/user";
import { AuthContext } from "../../auth/Context";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/toast/ToastContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(email, senha);
      if (response.token) {
        login(response.token);
        showToast("Login realizado com sucesso!", "success");
        return navigate("/");
      } else if (response.message) {
        showToast(response.message, "error");
      }
    } catch (error) {
      showToast(
        error.response?.data?.error ||
          "Erro ao fazer login. Tente novamente.",
        "error"
      );
    }
  };

  return (
    <div className="login">
      <div className="login_container">
        <h1>Login</h1>
        <form>
          <label htmlFor="email">Email</label>
          <input
            className="email"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputSenha senha={senha} setSenha={setSenha} />
          <button type="submit" onClick={handleLogin}>
            Entrar
          </button>
          <a className="cadastrar" href="/cadastro">
            Cadastre-se
          </a>
        </form>
      </div>
    </div>
  );
}
