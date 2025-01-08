import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, loggedUser }) => {
  const [visible, setVisible] = useState(false) // Tila näkyvyyden hallintaan

  // Tyylit
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  // Näkyvyyden vaihtaminen
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const confirmDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleDelete(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}{' '}
            <button onClick={() => handleLike(blog)}>like</button>
          </p>
          <p>Added by {blog.user?.name || blog.user?.username || 'Unknown'}</p>
          {loggedUser === blog.user.username && (
            <button onClick={confirmDelete} style={{ color: 'red'}}>
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
