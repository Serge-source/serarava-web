import { AdminPageHeader } from '../../components/AdminCard'
import AccommodationEditor from '../AccommodationEditor'
import { categories, units, houseRules } from '@/content/seed'

export const metadata = { title: 'Suites | Serava Admin' }

export default function SuitesPage() {
  const cat = categories.find(c => c.slug === 'suites')!
  const catUnits = units.filter(u => u.category === 'suites')
  return (
    <>
      <AdminPageHeader title="Serava Suites" desc="3 suites — settings and copy." />
      <AccommodationEditor category={cat} units={catUnits} houseRules={houseRules} />
    </>
  )
}
