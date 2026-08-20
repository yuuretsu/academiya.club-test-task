import { cartStore, withCartStoreProvider } from '@/shared/cart-store'
import { Header } from '@/widgets/header'
import { createRootRoute, Outlet } from '@tanstack/react-router'

const RootLayout = withCartStoreProvider(
  () => cartStore
)(() => {
  return (
    <div className="page">
      <Header />
      <Outlet />
    </div>
  )
})

export const Route = createRootRoute({
  component: RootLayout,
})
