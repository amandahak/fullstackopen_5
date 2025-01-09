import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = (event) => {
    event.preventDefault()

    // Kutsutaan App-komponentista saatua createBlog-funktiota
    createBlog({
      title,
      author,
      url,
    })

    // Tyhjennetään lomakkeen kentät
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          <input
            type="text"
            placeholder="write blog title here"
            value={title}
            aria-label='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="write blog author here"
            value={author}
            aria-label='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="write blog url here"
            value={url}
            aria-label='URL'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm
