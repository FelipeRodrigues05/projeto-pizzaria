import Head from "next/head"
import { FormEvent, useState } from "react"
import Header from "../../components/Header"
import styles from "./styles.module.scss"
import { toast } from "react-toastify"
import { setupAPIClient } from "../../services/api"
import { canSSRAuth } from "../../utils/canSSRAuth"

export default function Category() {
  const [name, setName] = useState('')

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    if(name === '' ) {
      toast.warning("Preencha os Dados")
      return
    }

    const apiClient = setupAPIClient()
    await apiClient.post('/category', {
      name: name
    })

    toast.success('Categoria criada com sucesso 😀')
    setName('')
  }

  return (
    <>
      <Head>
        <title>Sujeito Pizza - Nova Categoria</title>
      </Head>

      <div>
        <Header />

        <main className={styles.container}>
          <h1>Cadastrar Categoria</h1>

          <form className={styles.formContainer} onSubmit={handleRegister}>
            <input
              type={"text"}
              placeholder="Digite o nome da categoria"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button type="submit" className={styles.buttonAdd}>
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async(context) => {
  return {
    props: {}
  }
})