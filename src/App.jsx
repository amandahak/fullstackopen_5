import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  // Tilat
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  // Haetaan blogit sovelluksen käynnistyessä
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  // Tarkistetaan kirjautumistiedot local storagesta
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user) // Asetetaan käyttäjä tilaan
      blogService.setToken(user.token) // Asetetaan token palvelulle
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      console.log('Attempting login with:', username, password)
      const user = await loginService.login({ username, password })
      console.log('Login response:', user)
  
      if (!user.token) {
        throw new Error('Token missing in response')
      }
  
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('User successfully logged in and state updated:', user)
    } catch (error) {
      console.error('Login failed:', error.message)
      setErrorMessage('Wrong username or password')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }
  

  // Uloskirjautumisen käsittelijä
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser') // Poistetaan kirjautumistiedot
    setUser(null) // Nollataan käyttäjä tila
    blogService.setToken(null) // Nollataan token
  }

  // Lomakkeen ja listauksen ehdollinen renderöinti
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogList = () => (
    <div>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )

  return (
    <div>
      <h1>Bloglist</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {user === null ? loginForm() : blogList()}
    </div>
  )
}

export default App
