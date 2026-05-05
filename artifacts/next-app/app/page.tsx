import MarketplaceClient from '@/components/campusx/marketplace-client'

export const metadata = {
  title: 'CampusX - IITP Marketplace',
  description: 'The trusted marketplace for IITP students. Buy, Rent, or Sell with fellow students.',
}

export default function Home() {
  return <MarketplaceClient />
}
