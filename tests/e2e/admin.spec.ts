import { test, expect } from '@playwright/test'

const OWNER_EMAIL = process.env.SEED_OWNER_EMAIL ?? 'owner@seravaretreats.com'
const OWNER_PASSWORD = process.env.SEED_OWNER_PASSWORD ?? 'serava-dev-2026'

test.describe('admin', () => {
  test('redirects unauthenticated /admin to login', async ({ page }) => {
    await page.goto('/admin')
    await expect(page).toHaveURL(/\/admin\/login/)
  })

  test('login page renders', async ({ page }) => {
    await page.goto('/admin/login')
    await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/password/i)).toBeVisible()
  })

  test('shows error on wrong credentials', async ({ page }) => {
    await page.goto('/admin/login')
    await page.getByLabel(/email/i).fill('wrong@example.com')
    await page.getByLabel(/password/i).fill('wrongpassword')
    await page.getByRole('button', { name: /sign in/i }).click()
    await expect(page.getByText(/invalid|incorrect|check/i)).toBeVisible({ timeout: 10_000 })
  })

  test('logs in with valid credentials and reaches dashboard', async ({ page }) => {
    await page.goto('/admin/login')
    await page.getByLabel(/email/i).fill(OWNER_EMAIL)
    await page.getByLabel(/password/i).fill(OWNER_PASSWORD)
    await page.getByRole('button', { name: /sign in/i }).click()
    await expect(page).toHaveURL('/admin', { timeout: 15_000 })
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible()
  })

  test('dashboard shows stat cards after login', async ({ page }) => {
    await page.goto('/admin/login')
    await page.getByLabel(/email/i).fill(OWNER_EMAIL)
    await page.getByLabel(/password/i).fill(OWNER_PASSWORD)
    await page.getByRole('button', { name: /sign in/i }).click()
    await page.waitForURL('/admin')

    // Stat cards for accommodations, gallery, explore
    await expect(page.getByText('11')).toBeVisible()
    await expect(page.getByText('12')).toBeVisible()
  })

  test('can navigate to messages section', async ({ page }) => {
    await page.goto('/admin/login')
    await page.getByLabel(/email/i).fill(OWNER_EMAIL)
    await page.getByLabel(/password/i).fill(OWNER_PASSWORD)
    await page.getByRole('button', { name: /sign in/i }).click()
    await page.waitForURL('/admin')

    await page.goto('/admin/messages')
    await expect(page.getByRole('heading', { name: /messages/i })).toBeVisible()
  })
})
