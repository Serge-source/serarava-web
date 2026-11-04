import { test, expect } from '@playwright/test'
import { mkdir } from 'fs/promises'
import { join } from 'path'

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'desktop', width: 1440, height: 900 },
]

const PUBLIC_ROUTES = [
  { path: '/', name: 'home' },
  { path: '/accommodations', name: 'accommodations' },
  { path: '/accommodations/studios', name: 'accommodations-studios' },
  { path: '/accommodations/suites', name: 'accommodations-suites' },
  { path: '/accommodations/villa', name: 'accommodations-villa' },
  { path: '/amenities', name: 'amenities' },
  { path: '/gallery', name: 'gallery' },
  { path: '/explore-aruba', name: 'explore-aruba' },
  { path: '/about', name: 'about' },
  { path: '/contact', name: 'contact' },
  { path: '/booking', name: 'booking' },
]

const SCREENSHOT_DIR = join(process.cwd(), 'docs/screenshots')

test.beforeAll(async () => {
  await mkdir(SCREENSHOT_DIR, { recursive: true })
})

for (const vp of VIEWPORTS) {
  test.describe(`${vp.name} (${vp.width}px)`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } })

    for (const route of PUBLIC_ROUTES) {
      test(`${route.name}`, async ({ page }) => {
        await page.goto(route.path, { waitUntil: 'networkidle' })
        // Dismiss any cookie / overlay
        const path = join(SCREENSHOT_DIR, `${vp.name}_${route.name}.png`)
        await page.screenshot({ path, fullPage: true })
        // Basic sanity: page has a title mentioning Serava
        await expect(page).toHaveTitle(/Serava/)
      })
    }
  })
}
