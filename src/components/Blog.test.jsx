import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Blog from './Blog'
import BlogForm from './BlogForm'



// Testi, joka varmistaa että blogin näyttävä komponentti renderöi vai titlen ja authorin

describe('<Blog />', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
  }

  test('renders title and author by default, but not url or likes', () => {
    render(<Blog blog={blog} />)

    // Varmista, että title ja author renderöityvät
    const titleElement = screen.getByText('Test Blog Test Author')
    expect(titleElement).toBeDefined()

    // Varmista, että url ja likes eivät näy
    const urlElement = screen.queryByText('http://testurl.com')
    expect(urlElement).toBeNull()

    const likesElement = screen.queryByText('likes 5')
    expect(likesElement).toBeNull()
  })
})

// Testi, joka varmistaa että url, likejen määrä ja käyttäjä näytetään kun view-nappia painetaan
describe('<Blog />', () => {
  const blog = {
    id: '1',
    title: 'Testing React Components',
    author: 'React Tester',
    url: 'http://reacttesting.com',
    likes: 42,
    user: {
      username: 'testuser',
      name: 'Test User',
    },
  }

  const mockHandleLike = vi.fn()
  const mockHandleDelete = vi.fn()
  const loggedUser = 'testuser'

  it('shows url, likes, and user details when the "view" button is clicked', async () => {
    const user = userEvent.setup()

    render(
      <Blog
        blog={blog}
        handleLike={mockHandleLike}
        handleDelete={mockHandleDelete}
        loggedUser={loggedUser}
      />
    )

    // Varmistetaan, että url ja likes eivät näy oletuksena
    expect(screen.queryByText(blog.url)).toBeNull()
    expect(screen.queryByText(`likes ${blog.likes}`)).toBeNull()
    expect(screen.queryByText(`Added by ${blog.user.name}`)).toBeNull()

    // Klikataan "view"-nappia
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    // Varmistetaan, että url, likes ja käyttäjätiedot tulevat näkyviin
    expect(screen.getByText(blog.url)).toBeDefined()
    expect(screen.getByText(`likes ${blog.likes}`)).toBeDefined()
    expect(screen.getByText(`Added by ${blog.user.name}`)).toBeDefined()
  })
})

// Testi, jolla like-napin kahdesti painaminen toimii (tapahtumakäsittelijää kutsutaan kahdesti)
describe('<Blog />', () => {
  const blog = {
    id: '1',
    title: 'Testing React Components',
    author: 'React Tester',
    url: 'http://reacttesting.com',
    likes: 42,
    user: {
      username: 'testuser',
      name: 'Test User',
    },
  }

  const mockHandleLike = vi.fn()
  const mockHandleDelete = vi.fn()
  const loggedUser = 'testuser'

  it('calls the like button event handler twice when clicked twice', async () => {
    const user = userEvent.setup()

    render(
      <Blog
        blog={blog}
        handleLike={mockHandleLike}
        handleDelete={mockHandleDelete}
        loggedUser={loggedUser}
      />
    )

    // Klikataan "view"-nappia, jotta like-painike tulee näkyviin
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    // Etsitään "like"-nappi
    const likeButton = screen.getByText('like')

    // Klikataan "like"-nappia kahdesti
    await user.click(likeButton)
    await user.click(likeButton)

    // Varmistetaan, että like-eventhandleria kutsuttiin kahdesti
    expect(mockHandleLike.mock.calls).toHaveLength(2)
  })
})


// Testi, jolla testataan uuden blogin lomaketta
describe('<BlogForm />', () => {
  it('calls onSubmit with correct details when a new blog is created', async () => {
    const mockCreateBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={mockCreateBlog} />)

    // Etsi syötekentät ja "save"-nappi
    const titleInput = screen.getByPlaceholderText('write blog title here')
    const authorInput = screen.getByPlaceholderText('write blog author here')
    const urlInput = screen.getByPlaceholderText('write blog url here')
    const saveButton = screen.getByText('save')

    // Kirjoita kenttiin ja lähetä lomake
    await user.type(titleInput, 'Test Blog Title')
    await user.type(authorInput, 'Test Author')
    await user.type(urlInput, 'http://testblog.com')
    await user.click(saveButton)

    // Varmista, että createBlog-funktiota kutsuttiin kerran
    expect(mockCreateBlog.mock.calls).toHaveLength(1)

    // Varmista, että createBlog-funktiota kutsuttiin oikeilla tiedoilla
    expect(mockCreateBlog.mock.calls[0][0]).toEqual({
      title: 'Test Blog Title',
      author: 'Test Author',
      url: 'http://testblog.com',
    })
  })
})
