import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
    // Get user from localStorage (Saved during Register/Login)
    const user = JSON.parse(localStorage.getItem('user'));

    // 1. If not logged in at all, kick to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // 2. If it's an admin route, check for ROOT role
    // (In your RegisterPage, we called it ROOT, in App.js you called it admin)
    if (role === "admin" && user.role !== 'ROOT') {
        return <Navigate to="/home" replace />; // Regular users get kicked back to home
    }

    // 3. Otherwise, let them in
    return children;
};

export default ProtectedRoute;