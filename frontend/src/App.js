import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Page Imports
import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage'; 
import PostPage from './pages/PostPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import AdminPage from './pages/AdminPage';
import AboutPage from './pages/AboutPage'; 
import ContactPage from './pages/ContactPage';

function App() {
  const location = useLocation();

  // Hide Navbar on the Splash Page
  const showNavbar = location.pathname !== '/';

  return (
    <>
      {showNavbar && <Navbar />}
      <div className="main-content">
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path='/' element={<SplashPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/posts/:id' element={<PostPage />} />

          {/* --- USER PROTECTED ROUTES --- */}
          <Route 
            path='/profile' 
            element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} 
          />
          <Route 
            path='/create-post' 
            element={<ProtectedRoute><CreatePostPage /></ProtectedRoute>} 
          />
          <Route 
            path='/edit-post/:id' 
            element={<ProtectedRoute><EditPostPage /></ProtectedRoute>} 
          />

          {/* --- ADMIN PROTECTED ROUTE --- */}
          {/* Note: Ensure ProtectedRoute is coded to check for the "admin" role! */}
          <Route 
            path='/admin' 
            element={
              <ProtectedRoute role="admin">
                <AdminPage />
              </ProtectedRoute>
            } 
          />

          {/* --- 404 NOT FOUND --- */}
          <Route path="*" element={<div className="hero"><h1>404: SIGNAL LOST</h1></div>} />
        </Routes>
      </div>
    </>
  );
}

export default App;