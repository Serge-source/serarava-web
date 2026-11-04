import { AdminPageHeader } from '../../components/AdminCard'
import AccommodationEditor from '../AccommodationEditor'
import { categories, units, houseRules } from '@/content/seed'

export const metadata = { title: 'Private Villa | Serava Admin' }

export default function VillaPage() {
  const cat = categories.find(c => c.slug === 'villa')!
  const catUnits = units.filter(u => u.category === 'villa')
  return (
    <>
      <AdminPageHeader title="Serava Private Villa" desc="1 private villa — settings and copy." />
      <AccommodationEditor category={cat} units={catUnits} houseRules={houseRules} />
    </>
  )
}
