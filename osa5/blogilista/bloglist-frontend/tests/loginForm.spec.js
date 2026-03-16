import { test, expect } from '@playwright/test'

test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen123'
      }
    })

    await page.goto('http://localhost:5173/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('blogs')).toBeVisible()

    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('Log in')).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByLabel('username').first().fill('mluukkai')
      await page.getByLabel('password').last().fill('salainen123')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.locator('.success')).toBeVisible()
      await expect(page.locator('.success')).toContainText('logged in')
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByLabel('username').first().fill('mluukka')
      await page.getByLabel('password').last().fill('salainen123')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  test.describe('When logged in', () => {
    test.beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByLabel('username').first().fill('mluukkai')
      await page.getByLabel('password').last().fill('salainen123')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.locator('.success')).toBeVisible()
      await expect(page.locator('.success')).toContainText('logged in')
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()

      const textboxes = await page.getByRole('textbox').all()

      await textboxes[0].fill('React patterns')
      await textboxes[1].fill('Michael Chan')
      await textboxes[2].fill('https://reactpatterns.com/')

      await page.getByRole('button', { name: 'create' }).click()

      await expect(page.getByText('React patterns Michael Chan')).toBeVisible()
    })

    test('blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()

      const textboxes = await page.getByRole('textbox').all()

      await textboxes[0].fill('Test Blog for Liking')
      await textboxes[1].fill('Test Author')
      await textboxes[2].fill('Test Url')

      await page.getByRole('button', { name: 'create' }).click()

      await expect(page.getByText('Test Blog for liking Test Author')).toBeVisible()

      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('a blog can be removed', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()

      const textboxes = await page.getByRole('textbox').all()

      await textboxes[0].fill('Test Blog for Removing')
      await textboxes[1].fill('Test Author')
      await textboxes[2].fill('Test Url')

      await page.getByRole('button', { name: 'create' }).click()

      await expect(page.getByText('Test Blog for Removing Test Author')).toBeVisible()

      const blog = page.locator('.blog', { hasText: 'Test Blog for Removing' })

      await blog.getByRole('button', { name: 'view' }).click()

      page.on('dialog', dialog => dialog.accept())

      await blog.getByRole('button', { name: 'remove' }).click()

      await expect(page.getByText('Test Blog for Removing Test Author')).not.toBeVisible()
    })

    test('only creator can see the remove button', async ({ page, request }) => {
      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'unna',
          username: 'unnaman',
          password: 'salainen321'
        }
      })

      await page.getByRole('button', { name: 'create new blog' }).click()

      const textboxes = await page.getByRole('textbox').all()

      await textboxes[0].fill('Test Blog for Remove Button Visibility')
      await textboxes[1].fill('Test Author')
      await textboxes[2].fill('Test Url')

      await page.getByRole('button', { name: 'create' }).click()

      await expect(page.getByText('Test Blog for Remove Button Visibility Test Author')).toBeVisible()

      const blog = page.locator('.blog', { hasText: 'Test Blog for Remove Button Visibility' })

      await blog.getByRole('button', { name: 'view' }).click()
      await expect(blog.getByRole('button', { name: 'remove' })).toBeVisible()

      await page.getByRole('button', { name: 'logout' }).click()

      await page.getByRole('button', { name: 'login' }).click()
      await page.getByLabel('username').first().fill('unnaman')
      await page.getByLabel('password').last().fill('salainen321')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.locator('.success')).toBeVisible()
      await expect(page.locator('.success')).toContainText('logged in')

      const otherBlog = page.locator('.blog', { hasText: 'Test Blog for Remove Button Visibility' })

      await otherBlog.getByRole('button', { name: 'view' }).click()
      await expect(otherBlog.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })

    test('blogs are ordered according to likes', async ({ page }) => {
      const blogs = [
        { title: 'First Blog', author: 'Author One', url: 'http://example.com/1' },
        { title: 'Second Blog', author: 'Author Two', url: 'http://example.com/2' },
        { title: 'Third Blog', author: 'Author Three', url: 'http://example.com/3' }
      ]

      for (const blog of blogs) {
        await page.getByRole('button', { name: 'create new blog' }).click()

        const textboxes = await page.getByRole('textbox').all()

        await textboxes[0].fill(blog.title)
        await textboxes[1].fill(blog.author)
        await textboxes[2].fill(blog.url)

        await page.getByRole('button', { name: 'create' }).click()

        await expect(page.getByText(`${blog.title} ${blog.author}`)).toBeVisible()
      }

      let blogElements = page.locator('.blog')
      await expect(blogElements.nth(0)).toContainText('First Blog Author One')
      await expect(blogElements.nth(1)).toContainText('Second Blog Author Two')
      await expect(blogElements.nth(2)).toContainText('Third Blog Author Three')

      const secondBlog = page.locator('.blog', { hasText: 'Second Blog' })
      await secondBlog.getByRole('button', { name: 'view' }).click()
      await secondBlog.getByRole('button', { name: 'like' }).click()

      await expect(secondBlog).toContainText('likes 1')

      blogElements = page.locator('.blog')

      await expect(blogElements.nth(0)).toContainText('Second Blog Author Two')
      await expect(blogElements.nth(1)).toContainText('First Blog Author One')
      await expect(blogElements.nth(2)).toContainText('Third Blog Author Three')
    })
  })
})