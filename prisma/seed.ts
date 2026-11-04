import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import {
  property,
  contact,
  socials,
  integrations,
  categories,
  units,
  amenities,
  houseRules,
  explore,
  gallery,
  seo,
  pages,
} from '../content/seed'

const prisma = new PrismaClient()

async function main() {
  // Property
  await prisma.property.upsert({
    where: { id: 'main' },
    update: {},
    create: {
      id: 'main',
      name: property.name,
      tagline: property.tagline,
      blurb: property.blurb,
      email: contact.email,
      phone: contact.phone,
      whatsapp: contact.whatsapp,
      area: contact.area,
      instagram: socials.instagram,
      facebook: socials.facebook,
      mapsEmbed: integrations.mapsEmbed,
      notifyEmail: integrations.notifyEmail,
      analyticsId: integrations.analyticsId,
    },
  })

  // Categories + their amenities
  for (let i = 0; i < categories.length; i++) {
    const cat = categories[i]
    const record = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        slug: cat.slug,
        name: cat.name,
        filter: cat.filter,
        units: cat.units,
        maxGuests: cat.maxGuests,
        short: cat.short,
        description: cat.description,
        bedrooms: cat.bedrooms,
        bathrooms: cat.bathrooms,
        photo: cat.photo,
        order: i,
      },
    })
    // Category amenities
    await prisma.categoryAmenity.deleteMany({ where: { categoryId: record.id } })
    for (let j = 0; j < cat.amenities.length; j++) {
      await prisma.categoryAmenity.create({
        data: { categoryId: record.id, icon: cat.amenities[j][0], label: cat.amenities[j][1], order: j },
      })
    }
  }

  // Units
  for (const unit of units) {
    const cat = await prisma.category.findUnique({ where: { slug: unit.category } })
    if (!cat) continue
    await prisma.unit.upsert({
      where: { id: unit.id },
      update: {},
      create: {
        id: unit.id,
        categoryId: cat.id,
        name: unit.name,
        maxGuests: unit.maxGuests,
        status: unit.status,
      },
    })
  }

  // Amenities
  await prisma.amenity.deleteMany()
  for (let i = 0; i < amenities.length; i++) {
    await prisma.amenity.create({
      data: { icon: amenities[i].icon, title: amenities[i].title, text: amenities[i].text, order: i },
    })
  }

  // House rules
  await prisma.houseRule.deleteMany()
  for (let i = 0; i < houseRules.length; i++) {
    await prisma.houseRule.create({ data: { text: houseRules[i], order: i } })
  }

  // Explore
  for (let i = 0; i < explore.length; i++) {
    const e = explore[i]
    await prisma.exploreEntry.upsert({
      where: { key: e.key },
      update: {},
      create: { key: e.key, cat: e.cat, title: e.title, text: e.text, order: i },
    })
  }

  // Gallery
  for (let i = 0; i < gallery.length; i++) {
    const g = gallery[i]
    await prisma.galleryItem.upsert({
      where: { id: g.id },
      update: {},
      create: { id: g.id, cat: g.cat, caption: g.caption, order: i },
    })
  }

  // SEO
  for (const s of seo) {
    await prisma.seoEntry.upsert({
      where: { key: s.key },
      update: {},
      create: { key: s.key, route: s.route, title: s.title, description: s.description },
    })
  }

  // Page content
  for (const [key, data] of Object.entries(pages)) {
    await prisma.pageContent.upsert({
      where: { key },
      update: { data: data as object },
      create: { key, data: data as object },
    })
  }

  // Seed admin owner from env
  const ownerEmail = process.env.SEED_OWNER_EMAIL || 'owner@seravaretreats.com'
  const ownerPassword = process.env.SEED_OWNER_PASSWORD || 'changeme'
  const ownerName = process.env.SEED_OWNER_NAME || 'Property Owner'
  await prisma.user.upsert({
    where: { email: ownerEmail },
    update: {},
    create: {
      name: ownerName,
      email: ownerEmail,
      password: await bcrypt.hash(ownerPassword, 12),
      role: 'Owner',
      status: 'Active',
    },
  })

  console.log('Seed complete.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
