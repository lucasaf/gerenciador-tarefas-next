import type { NextPage } from 'next'
import { useState } from 'react'
import { executeRequest } from '../services/api';
import { AccessTokenProps } from '../types/AccessTokenProps';

const LoginForm: NextPage<AccessTokenProps> = ({ setAccessToken, handleToggleRegister }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [msgErro, setMsgErro] = useState('');
  const [isLoading, setLoading] = useState(false);

  const doLogin = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault();

      if (!login || !password) {
        setMsgErro('Parâmetros de entrada inválidos');
        setLoading(false);
        return;
      }

      const body = {
        login,
        password
      }

      const result = await executeRequest('login', 'POST', body);

      setMsgErro('');
      if (result && result.data) {
        localStorage.setItem('accessToken', result.data.token);
        localStorage.setItem('userName', result.data.name);
        localStorage.setItem('userEmail', result.data.email);
        setAccessToken(result.data.token);
      } else {
        setMsgErro('Nao foi possivel processar login tente novamente!');
      }
    } catch (e: any) {
      console.log(e);
      if (e?.response?.data?.error) {
        setMsgErro(e?.response?.data?.error);
      } else {
        setMsgErro('Ocorreu erro ao processar login tente novamente!');
      }
    }

    setLoading(false);
  }

  return (
    <form>
      {msgErro && <p>{msgErro}</p>}
      <div className="input">
        <img src="/mail.svg" alt="Logo Fiap" />
        <input type="text" placeholder="Informe seu email"
          value={login} onChange={e => setLogin(e.target.value)} />
      </div>
      <div className="input">
        <img src="/lock.svg" alt="Logo Fiap" />
        <input type="password" placeholder="Informe sua senha"
          value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button className={isLoading ? "disabled" : ""} type="button" onClick={doLogin} disabled={isLoading}>{isLoading ? "...Carregando" : "Login"}</button>
      <a onClick={handleToggleRegister}>Cadastre-se</a>
    </form>
  )
}

export { LoginForm }
