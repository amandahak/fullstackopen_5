import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([]) // Blogien lista
  const [user, setUser] = useState(null) // Kirjautunut käyttäjä
  const [username, setUsername] = useState('') // Käyttäjänimi syötteessä
  const [password, setPassword] = useState('') // Salasana syötteessä
  const [errorMessage, setErrorMessage] = useState(null) // Virheviestit
  const [successMessage, setSuccessMessage] = useState(null) // Onnistumisviestit

  const blogFormRef = useRef()

  // Haetaan blogit backendistä, kun komponentti renderöidään
  useEffect(() => {
    blogService.getAll().then((blogs) => {
      console.log('Fetched blogs from backend:', blogs)
      setBlogs(blogs)
    })
  }, [])

  // Tarkistetaan local storagessa oleva kirjautumistieto
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log('Logged in user from localStorage:', user)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Kirjautumisen käsittelijä
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      console.log('User logged in:', user)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error('Login error:', error)
      setErrorMessage('Wrong username or password')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  // Uloskirjautumisen käsittelijä
  const handleLogout = () => {
    console.log('Logging out user')
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    blogService.setToken(null)
  }

  // Uuden blogin lisäämisen käsittelijä
  const addBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility() // Piilotetaan lomake
      const addedBlog = await blogService.create(newBlog)
      console.log('New blog added:', addedBlog)

      // Lisätään uusi blogi frontendin tilaan
      const blogWithUser = addedBlog.user
        ? addedBlog
        : { ...addedBlog, user: { username: user.username, name: user.name } }
      console.log('New blog with user details:', blogWithUser)

      setBlogs(blogs.concat(blogWithUser))
      setSuccessMessage(`A new blog "${addedBlog.title}" by ${addedBlog.author} added`)
      setTimeout(() => setSuccessMessage(null), 5000)
    } catch (error) {
      console.error('Error adding blog:', error)
      setErrorMessage('Failed to add blog')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  // Like-painikkeen käsittelijä
  const handleLike = async (blog) => {
    try {
      console.log('Liking blog:', blog)
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id || blog.user, // Jos user on objekti, käytetään ID:tä
      }
      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      console.log('Updated blog after like:', returnedBlog)

      const updatedBlogWithUser = { ...returnedBlog, user: blog.user }
      setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlogWithUser : b)))
      setSuccessMessage(`You liked "${returnedBlog.title}"`)
      setTimeout(() => setSuccessMessage(null), 5000)
    } catch (error) {
      console.error('Error liking blog:', error)
      setErrorMessage('Failed to like the blog')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  // Kirjautumislomake
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  // Blogien poistaminen
  const handleDelete = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
      setSuccessMessage('Blog removed successfully')
      setTimeout(() => setSuccessMessage(null), 5000)
    } catch (error) {
      setErrorMessage('Failed to remove blog')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  // Blogilista ja lomake (kirjautuneelle käyttäjälle)
  const blogList = () => (
    <div>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <h2>blogs</h2>
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes) // Järkätään likejen mukaisesti
        .map((blog) => (
          <Blog 
          key={blog.id} 
          blog={blog} 
          handleLike={handleLike}
          handleDelete={handleDelete}
          loggedUser={user.username} 
        />
      ))}
    </div>
  )

  return (
    <div>
      <h1>Bloglist</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {user === null ? loginForm() : blogList()}
    </div>
  )
}

export default App
