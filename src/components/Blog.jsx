import { useState } from 'react'
import PropTypes from 'prop-types'

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
            <button onClick={confirmDelete} style={{ color: 'red' }}>
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// PropTypes -määrittelyt
Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      username: PropTypes.string
    })
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blog
