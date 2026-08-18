import { Link } from '@tanstack/react-router'

export function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/cart">Корзина</Link>
      </nav>
    </header>
  )
}
