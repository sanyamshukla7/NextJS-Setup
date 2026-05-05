import Navbar from '@/components/campusx/navbar'
import Hero from '@/components/campusx/hero'
import MainContent from '@/components/campusx/main-content'
import Footer from '@/components/campusx/footer'

export const metadata = {
  title: 'CampusX - IITP Marketplace',
  description: 'The trusted marketplace for IITP students. Buy, Rent, or Sell with fellow students.',
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <Hero />
      <MainContent />
      <Footer />
    </div>
  )
}
