import type { NextPage } from 'next'
import { useState } from 'react'
import { executeRequest } from '../services/api';
import { LoginOrRegisterProps } from '../types/LoginOrRegisterProps';

const RegisterForm: NextPage<LoginOrRegisterProps> = ({ handleToggleRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msgErro, setMsgErro] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleRegister = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault();

      if (!name || !email || !password) {
        setMsgErro('Parâmetros de entrada inválidos');
        setLoading(false);
        return;
      }

      const body = {
        name,
        email,
        password
      }

      const result = await executeRequest('user', 'POST', body);
      setMsgErro('');

      if (result && result.data) {
        handleToggleRegister();
      } else {
        setMsgErro('Nao foi possivel cadastrar o usuario!');
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
        <input type="text" placeholder="Informe seu nome"
          value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div className="input">
        <img src="/mail.svg" alt="Logo Fiap" />
        <input type="text" placeholder="Informe seu email"
          value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="input">
        <img src="/lock.svg" alt="Logo Fiap" />
        <input type="password" placeholder="Informe sua senha"
          value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button className={isLoading ? "disabled" : ""} type="button" onClick={handleRegister} disabled={isLoading}>{isLoading ? "...Carregando" : "Cadastrar"}</button>
      <a onClick={handleToggleRegister}>Voltar</a>
    </form>
  )
}

export { RegisterForm }