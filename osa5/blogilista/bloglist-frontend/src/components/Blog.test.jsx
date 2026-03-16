import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author but not url or likes', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 11,
    user: {
      id: '123',
      username: 'Matti Meikäläinen',
      name: 'Matti'
    }
  }

  const mockUpdateBlog = () => {}
  const mockRemoveBlog = () => {}
  const currentUser = {
    username: 'Matti Meikäläinen',
    name: 'Matti'
  }

  render(
    <Blog
      blog={blog}
      updateBlog={mockUpdateBlog}
      removeBlog={mockRemoveBlog}
      currentUser={currentUser}
    />
  )

  const element = screen.getByText('Component testing is done with react-testing-library Michael Chan')
  expect(element).toBeDefined()

  const urlElement = screen.getByText('https://reactpatterns.com/')
  expect(urlElement).not.toBeVisible()

  const likesElement = screen.getByText('likes 11')
  expect(likesElement).not.toBeVisible()
})


test('clicking the view button shows url, likes and user', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 11,
    user: {
      id: '123',
      username: 'Matti Meikäläinen',
      name: 'Matti'
    }
  }

  const mockUpdateBlog = () => {}
  const mockRemoveBlog = () => {}
  const currentUser = {
    username: 'Matti Meikäläinen',
    name: 'Matti'
  }

  render(
    <Blog
      blog={blog}
      updateBlog={mockUpdateBlog}
      removeBlog={mockRemoveBlog}
      currentUser={currentUser}
    />
  )

  const user = userEvent.setup()

  const urlElement = screen.getByText('https://reactpatterns.com/')
  expect(urlElement).not.toBeVisible()

  const likesElement = screen.getByText('likes 11')
  expect(likesElement).not.toBeVisible()

  const userElement = screen.getByText('Matti')
  expect(userElement).not.toBeVisible()

  const button = screen.getByText('view')
  await user.click(button)

  expect(urlElement).toBeVisible()
  expect(likesElement).toBeVisible()
  expect(userElement).toBeVisible()
})

test('clicking the like button two times, handler is called two times', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 11,
    user: {
      id: '123',
      username: 'Matti Meikäläinen',
      name: 'Matti'
    }
  }

  const mockHandler = vi.fn()
  const mockRemoveBlog = () => {}
  const currentUser = {
    username: 'Matti Meikäläinen',
    name: 'Matti'
  }

  render(
    <Blog
      blog={blog}
      updateBlog={mockHandler}
      removeBlog={mockRemoveBlog}
      currentUser={currentUser}
    />
  )

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})