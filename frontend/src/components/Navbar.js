import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link title="GamerZone" to="/home">GZ<span>.</span></Link>
      </div>
      <div className="nav-links">
        <Link to="/home">Feed</Link>
        {token ? (
          <>
            <Link to="/create-post">Post</Link>
            <Link to="/profile">Profile</Link>
            {user?.role === 'admin' && <Link to="/admin" className="admin-link">Admin</Link>}
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="nav-register">Join</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;