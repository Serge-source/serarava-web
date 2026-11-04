import { test, expect } from '@playwright/test'

test.describe('public navigation', () => {
  test('home page loads and has hero section', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Serava Retreats/)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('nav links reach all major pages', async ({ page }) => {
    await page.goto('/')
    const links = [
      { text: /accommodations/i, url: '/accommodations' },
      { text: /amenities/i, url: '/amenities' },
      { text: /gallery/i, url: '/gallery' },
      { text: /explore/i, url: '/explore-aruba' },
      { text: /about/i, url: '/about' },
      { text: /contact/i, url: '/contact' },
    ]
    for (const { text, url } of links) {
      await page.goto('/')
      await page.getByRole('link', { name: text }).first().click()
      await expect(page).toHaveURL(new RegExp(url))
    }
  })

  test('accommodation slugs load correctly', async ({ page }) => {
    for (const slug of ['studios', 'suites', 'villa']) {
      await page.goto(`/accommodations/${slug}`)
      await expect(page.locator('h1')).toBeVisible()
      await expect(page).not.toHaveURL('/404')
    }
  })

  test('footer is visible on all pages', async ({ page }) => {
    for (const path of ['/', '/accommodations', '/contact']) {
      await page.goto(path)
      await expect(page.locator('footer')).toBeVisible()
    }
  })
})
