import { test, expect } from '@playwright/test'

test.describe('contact form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact')
  })

  test('form renders with all fields', async ({ page }) => {
    await expect(page.getByLabel(/name/i)).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/subject/i)).toBeVisible()
    await expect(page.getByLabel(/message/i)).toBeVisible()
  })

  test('shows validation error for empty submit', async ({ page }) => {
    await page.getByRole('button', { name: /send/i }).click()
    // Browser native validation prevents submit; form stays on page
    await expect(page).toHaveURL('/contact')
  })

  test('submits valid form and shows success', async ({ page }) => {
    await page.route('/api/contact', async route => {
      await route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) })
    })

    await page.getByLabel(/name/i).fill('Test User')
    await page.getByLabel(/email/i).fill('test@example.com')
    await page.getByLabel(/subject/i).fill('Test inquiry')
    await page.getByLabel(/message/i).fill('This is a test message from Playwright.')
    await page.getByRole('button', { name: /send/i }).click()

    await expect(page.getByText(/thank you/i)).toBeVisible({ timeout: 10_000 })
  })

  test('shows error state on server error', async ({ page }) => {
    await page.route('/api/contact', async route => {
      await route.fulfill({ status: 500, body: JSON.stringify({ error: 'Server error' }) })
    })

    await page.getByLabel(/name/i).fill('Test User')
    await page.getByLabel(/email/i).fill('test@example.com')
    await page.getByLabel(/subject/i).fill('Test inquiry')
    await page.getByLabel(/message/i).fill('This is a test message from Playwright.')
    await page.getByRole('button', { name: /send/i }).click()

    await expect(page.getByText(/sorry|error|try again/i)).toBeVisible({ timeout: 10_000 })
  })
})
