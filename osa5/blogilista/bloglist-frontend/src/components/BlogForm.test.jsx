import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('When a form is created, it calls createBlog with correct details', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'React patterns')
  await user.type(authorInput, 'Michael Chan')
  await user.type(urlInput, 'https://reactpatterns.com/')

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)

  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/'
  })
})