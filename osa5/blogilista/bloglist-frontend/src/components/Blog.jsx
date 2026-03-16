import { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog, currentUser }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    const updatedBlog = {
      user: blog.user?.id || blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    updateBlog(blog.id, updatedBlog)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
    }
  }

  console.log('Blog:', blog.title)
  console.log('Blog user:', blog.user)
  console.log('Current user:', currentUser)
  console.log('Show remove?', blog.user?.username === currentUser?.username)

  return (
    <div style={blogStyle} className='blog' >
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility} style={hideWhenVisible}>
          view
        </button>
        <button onClick={toggleVisibility} style={showWhenVisible}>
          hide
        </button>
      </div>
      <div style={showWhenVisible} >
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={handleLike}>like</button>
        </div>
        <div>{blog.user?.name}</div>
        {blog.user?.username === currentUser?.username && (
          <button onClick={handleRemove}>remove</button>
        )}
      </div>
    </div>
  )
}

export default Blog