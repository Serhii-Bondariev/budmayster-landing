// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'; // Імпортуйте Register
import Products from './pages/Products';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} /> {/* Додайте маршрут для реєстрації */}
                <Route path="/products" element={<Products />} />
            </Routes>
        </Router>
    );
}

export default App;
