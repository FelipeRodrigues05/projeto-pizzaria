import Head from "next/head"
import { ChangeEvent, FormEvent, useState } from "react"
import { toast } from "react-toastify"
import Header from "../../components/Header"
import { canSSRAuth } from "../../utils/canSSRAuth"
import styles from "./styles.module.scss"

import { FiUpload } from "react-icons/fi"
import { setupAPIClient } from "../../services/api"

type ItemProps = {
  id: string;
  name: string;
}

interface CategoryProps {
  categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [imageAvatar, setImageAvatar] = useState(null)

  const [categories, setCategories] = useState(categoryList || [])
  const [selectedCategory, setSelectedCategory] = useState(0)

  async function handleRegister(event: FormEvent) {
    event.preventDefault()

    try {
      const data = new FormData()

      if (name === '' || price === '' || description === '' || imageAvatar === null) {
        toast.warning("Preencha todos os campos")
        return
      }

      data.append('name', name)
      data.append('price', price)
      data.append('description', description)
      data.append('category_id', categories[selectedCategory].id)
      data.append('file', imageAvatar)

      const apiClient = setupAPIClient()

      await apiClient.post('/product', data)

      toast.success("Produto cadastrado com sucesso!")

      setName('')
      setPrice('')
      setDescription('')
      setAvatarUrl('')
    } catch (err) {
      toast.error("Houve um erro ao cadastrar")
    }
  }

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {

    if (!event.target.files) return

    const image = event.target.files[0]

    if (!image) return

    if (image.type === 'image/jpeg' || image.type === 'image/png') {
      setImageAvatar(image)
      setAvatarUrl(URL.createObjectURL(event.target.files[0]))
    }
  }

  return (
    <>
      <Head>
        <title>Sujeito Pizza - Novo Produto</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1>Novo Produto</h1>

          <form className={styles.formContainer} onSubmit={handleRegister}>

            <label className={styles.labelAvatar}>

              <span>
                <FiUpload size={30} color="#FFF" />
              </span>
              <input type={"file"} accept="image/png, image/jpeg" onChange={handleFile} />

              {avatarUrl && (
                <img
                  className={styles.preview}
                  src={avatarUrl}
                  alt="Foto do produto"
                  width={250}
                  height={250}
                />
              )}

            </label>

            <select value={selectedCategory} onChange={(e) => setSelectedCategory(Number(e.target.value))}>
              {categories.map((item, index) => {
                return (
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                )
              })}
            </select>

            <input
              type="text"
              placeholder="Digite o nome do produto"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Digite o preço do produto"
              className={styles.input}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <textarea
              placeholder="Descrição do produto"
              className={styles.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button className={styles.buttonAdd} type="submit">
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (context) => {

  const apiClient = setupAPIClient(context)

  const response = await apiClient.get("/category")

  return {
    props: {
      categoryList: response.data
    }
  }
})