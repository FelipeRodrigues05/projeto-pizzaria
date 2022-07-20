import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { FormEvent, useContext, useState } from "react"
import { toast } from "react-toastify"
import logoImg from "../../../public/logo.svg"
import styles from "../../../styles/home.module.scss"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { AuthContext } from "../../contexts/AuthContext"


export default function SignUp() {
  const { signUp } = useContext(AuthContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if (name === '' || email === '' || password === '') {
      toast.warning("Preencha todos os campos")
      return
    }

    setLoading(true)
    let data = {
      name,
      email,
      password
    }

    await signUp(data)

    setLoading(false)

  }

  return (
    <>
      <Head>
        <title>Sujeito Pizza - Faça seu Cadastro</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

        <div className={styles.login}>

          <h1>Criando sua Conta</h1>
          <form onSubmit={handleSignUp}>
            <Input
              placeholder="Nome da Empresa"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Digite seu email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="Sua senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              loading={loading}
            >
              Cadastrar
            </Button>
            <Link href="/">
              <a className={styles.text}>Já possui uma conta? Faça Login!</a>
            </Link>
          </form>
        </div>
      </div>
    </>
  )
}
