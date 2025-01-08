import { Outlet } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import Header from './Header';
import Footer from './Footer';

export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext();

    const handleLogout = () => {
        // Clear user and token from context
        setUser(null);
        setToken(null);
        // Optionally, you can also clear the token from localStorage
        localStorage.removeItem('ACCESS_TOKEN');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header user={user} token={token} onLogout={handleLogout} />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}