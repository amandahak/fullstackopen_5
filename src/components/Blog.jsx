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
    <div style={blogStyle} className="blog">
      <div className="blogTitleAuthor">
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibility} className="viewButton">
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <div className="blogDetails">
          <p className="blogUrl">{blog.url}</p>
          <p className="blogLikes">
            likes {blog.likes}{' '}
            <button onClick={() => handleLike(blog)} className="likeButton">like</button>
          </p>
          <p>Added by {blog.user?.name || blog.user?.username || 'Unknown'}</p>
          {loggedUser === blog.user?.username && (
            <button onClick={confirmDelete} style={{ color: 'red' }} className="deleteButton">
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
      username: PropTypes.string,
    }),
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  loggedUser: PropTypes.string.isRequired,
}

export default Blog
