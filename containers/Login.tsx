import type { NextPage } from 'next'
import { useState } from 'react'
import { LoginForm } from '../components/LoginForm'
import { RegisterForm } from '../components/RegisterForm'
import { AccessTokenProps } from '../types/AccessTokenProps';

const Login: NextPage<AccessTokenProps> = ({ setAccessToken }) => {
  const [registerOpen, setRegisterOpen] = useState(false);

  const handleToggleRegister = () => {
    setRegisterOpen(!registerOpen)
  }

  return (
    <div className="container-login">
      <img src="/logo.svg" alt="Logo Fiap" className="logo" />
      {!registerOpen ? 
        <LoginForm 
          setAccessToken={setAccessToken}
          handleToggleRegister={handleToggleRegister} />
        : <RegisterForm handleToggleRegister={handleToggleRegister} />}
    </div>
  )
}

export { Login }
