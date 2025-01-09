import PropTypes from 'prop-types'
import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }))

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

// Lisätään PropTypes-määrittelyt
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired, // Varmistetaan, että buttonLabel on pakollinen ja tyyppi string
  children: PropTypes.node.isRequired, // Varmistetaan, että children on React-node ja pakollinen
}

// Lisätään komponentille displayName (React Developer Toolsia varten)
Togglable.displayName = 'Togglable'

export default Togglable
