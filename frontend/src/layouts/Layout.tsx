import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Hero from "@/components/Hero"

type Props = {
  children: React.ReactNode
  showhero?: boolean
}

const Layout = ({ children, showhero = false }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {showhero && <Hero />}

      <div className="container mx-auto flex-1 py-10">{children}</div>

      <Footer />
    </div>
  )
}

export default Layout
