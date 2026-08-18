import { Header } from '@/widgets/header'
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <div className="page">
      <Header />
      <Outlet />
    </div>
  )
}
