import { AdminPageHeader } from '../../components/AdminCard'
import AccommodationEditor from '../AccommodationEditor'
import { categories, units, houseRules } from '@/content/seed'

export const metadata = { title: 'Studios | Serava Admin' }

export default function StudiosPage() {
  const cat = categories.find(c => c.slug === 'studios')!
  const catUnits = units.filter(u => u.category === 'studios')
  return (
    <>
      <AdminPageHeader title="Serava Studios" desc="7 studios — settings and copy for the Studios accommodation type." />
      <AccommodationEditor category={cat} units={catUnits} houseRules={houseRules} />
    </>
  )
}
