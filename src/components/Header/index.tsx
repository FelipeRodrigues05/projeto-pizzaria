import Link from "next/link"
import { useContext } from "react"
import { FiLogOut } from "react-icons/fi"
import { AuthContext } from "../../contexts/AuthContext"
import styles from "./styles.module.scss"

export default function Header() {

  const { signOut } = useContext(AuthContext)

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <img src="/logo.svg" width={190} height={60} />
        </Link>

        <nav className={styles.menuNav}>
          <Link href="/category">
            <a>Categoria</a>
          </Link>
          <Link href="/product">
            <a>Cardápio</a>
          </Link>

          <button onClick={signOut}>
            <FiLogOut color="#FFF" size={24} />
          </button>
        </nav>

      </div>
    </header>
  )
}