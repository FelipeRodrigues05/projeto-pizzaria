import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { FormEvent, useContext, useState } from "react"
import { toast } from "react-toastify"
import logoImg from "../../public/logo.svg"
import styles from "../../styles/home.module.scss"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { AuthContext } from "../contexts/AuthContext"
import { canSSRGuest } from "../utils/canSSRGuest"

export default function Home() {
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent) {
    event.preventDefault()

    if (email === '' || password === '') {
      toast.warning("Preencha todos os campos")
      return
    }

    setLoading(true)

    let data = {
      email,
      password
    }
    await signIn(data)

    setLoading(false)
  }
  return (
    <>
      <Head>
        <title>Sujeito Pizza - Faça seu Login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
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
              Acessar
            </Button>
            <Link href="/signup">
              <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
            </Link>
          </form>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})