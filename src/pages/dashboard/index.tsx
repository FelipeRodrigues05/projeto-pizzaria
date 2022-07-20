import Head from "next/head"
import { useState } from "react"
import { FiRefreshCcw } from "react-icons/fi"
import Modal from "react-modal"
import { toast } from "react-toastify"
import Header from "../../components/Header"
import { ModalOrder } from "../../components/ModalOrder"
import { setupAPIClient } from "../../services/api"
import { canSSRAuth } from "../../utils/canSSRAuth"
import styles from "./styles.module.scss"

type OrderProps = {
  id: string;
  table: number | number;
  status: boolean;
  draft: boolean;
  name: string | null;
}

interface HomeProps {
  orders: OrderProps[]
}

export type OrderItemProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    banner: string;
  }
  order: {
    id: string;
    table: string | number;
    status: boolean;
    name: string | null;
  }
}

export default function Dashboard({ orders }: HomeProps) {
  const [orderList, setOrderList] = useState(orders || [])

  const [modalItem, setModalItem] = useState<OrderItemProps[]>()
  const [modalVisible, setModalVisible] = useState(false)

  function handleCloseModal() {
    setModalVisible(false)
  }

  async function handleOpenModalView(id: string) {
    const apiClient = setupAPIClient()

    const response = await apiClient.get("/order/details", {
      params: {
        order_id: id
      }
    })

    setModalItem(response.data)
    setModalVisible(true)
  }

  async function handleFinishItem(id: string) {
    const apiClient = setupAPIClient()
    await apiClient.put('/order/finish', {
      order_id: id,
    })

    toast.success("Pedido finalizado com sucesso")
    const response = await apiClient.get("/order")

    setOrderList(response.data)
    setModalVisible(false)
  }

  async function handleRefreshOrders() {
    const apiClient = setupAPIClient()
    const response = await apiClient.get("/order")

    setOrderList(response.data)
  }

  Modal.setAppElement('#__next')

  return (
    <>
      <Head>
        <title>Sujeito Pizza - Painel</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Últimos Pedidos</h1>
            <button onClick={handleRefreshOrders}>
              <FiRefreshCcw size={25} color="#3FFFA3" />
            </button>
          </div>

          <article className={styles.listOrders}>

            {orderList.length === 0 && (
              <span className={styles.emptyList}>
                Nenhum pedido aberto foi encontrado
              </span>
            )}

            {orderList.map(item => (
              <section className={styles.orderItem} key={item.id}>
                <button onClick={() => handleOpenModalView(item.id)}>
                  <div className={styles.tag}></div>
                  <span>Mesa {item.table}</span>
                </button>
              </section>

            ))}

          </article>

        </main>
        {modalVisible &&
          <ModalOrder
            isOpen={modalVisible}
            onRequestClose={handleCloseModal}
            order={modalItem}
            handleFinishOrder={handleFinishItem}
          />
        }
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (context) => {
  const apiClient = setupAPIClient(context)

  const response = await apiClient.get("/order")

  return {
    props: {
      orders: response.data
    }
  }
})