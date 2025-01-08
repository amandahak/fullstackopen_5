import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([]) // Blogilista
  const [username, setUsername] = useState('') // Kirjautumislomakkeen käyttäjänimi
  const [password, setPassword] = useState('') // Kirjautumislomakkeen salasana
  const [user, setUser] = useState(null) // Kirjautuneen käyttäjän tiedot
  const [errorMessage, setErrorMessage] = useState(null) // Virheiden näyttäminen

  // Haetaan blogit backendistä
  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  // Käsittele kirjautuminen
  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user) // Asetetaan käyttäjän tiedot
      setUsername('') // Tyhjennetään lomake
      setPassword('')
    } catch (exception) {
      setErrorMessage('Invalid username or password')
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

  return (
    <div>
      <h2>blogs</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* Näytetään kirjautumislomake, jos käyttäjä ei ole kirjautunut */}
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p>
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
