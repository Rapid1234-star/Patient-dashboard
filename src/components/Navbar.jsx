import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="header">
      <div className="brand">Jarurat Care</div>
      <nav className="nav">
        <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Home</NavLink>
        <NavLink to="/patients" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Patients</NavLink>
        <NavLink to="/about" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>About</NavLink>
      </nav>
    </header>
  )
}

export default Navbar