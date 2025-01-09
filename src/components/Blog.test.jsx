import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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
