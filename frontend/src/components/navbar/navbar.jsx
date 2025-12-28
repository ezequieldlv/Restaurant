import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const [user, setUser] = useState('');
    const [hover, setHover] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        const userFromStorage = localStorage.getItem('LogedUser');
        if (userFromStorage) {
            setUser(JSON.parse(userFromStorage));
        }
    }, []);

    const handleLogOut = () => {
        localStorage.removeItem('LogedUser');
        setUser(null);
        navigate("/login")
    };

    const linkStyle = {
        textDecoration: hover ? 'underline' : 'none',
        color: hover ? '#FFFFFF' : 'slategray', 
        fontSize: hover ? '22px' : '24px',
        fontWeight: 'bold',
        transition: 'color 0.3s ease, font-size 0.3s ease',
        padding: '10px 20px',
      };

  return (
    <nav className="navbar d-flex justify-content-between container-fluid border-bottom" style={{ backgroundColor: 'black', padding: '15px' }}>
        <div className="d-flex justify-content-start ms-3">
            <img src="/src/assets/react.svg" alt="logo" className="img-fluid mx-3" width="50px" />
            <p className='my-2 text-light'>Bienvenido {user.nombre}</p>
        </div>
        <div className='mx-5 pe-4 '>
            <Link
            to="/home"
            style={linkStyle}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="nav-link"
            >
                MIS RESERVAS
            </Link>
        </div>
        <div className='me-5 mt-3'>
            <button onClick={handleLogOut} className="btn btn-danger mb-3">Cerrar sesión</button>
        </div>
    </nav>
  )
}
