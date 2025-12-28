import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found" style={{ backgroundColor: "darkgray", minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="not-found-container" style={{ maxWidth: '800px', padding: '20px', background: '#fff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <div className="not-found-image m-auto" style={{ width: '60%'}}>
          <img src="/src/assets/page-not-found.jpg" alt="Page Not Found" className="img-fluid" />
        </div>
        <div className="not-found-content" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>Oh no! No pudimos encontrar la pagina que buscabas.</h1>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.5', marginBottom: '20px' }}>
            Parece que quieres acceder a una pagina que no existe. No te preocupes, lo tenemos solucionado.
          </p>
          <ul className="not-found-options list-unstyled" style={{ padding: '0' }}>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/home" className="text-primary" style={{ textDecoration: 'underline', transition: 'color 0.3s ease' }}>
                <i className="fas fa-home" style={{ fontSize: '1 rem', marginRight: '10px' }}></i>
                    QUIERO VOLVER AL HOME!
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
