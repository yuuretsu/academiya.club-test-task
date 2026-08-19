import { Link } from '@tanstack/react-router'
import { observer } from 'mobx-react'
import styles from './header.module.css'

export const Header = observer(() => {
  return (
    <header className={styles.header}>
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/cart">Корзина</Link>
      </nav>
    </header>
  )
});
