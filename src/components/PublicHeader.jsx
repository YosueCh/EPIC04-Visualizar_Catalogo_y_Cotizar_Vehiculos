import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/images/logo.jpg';
import { marcas } from '../data/vehiculos';

export default function PublicHeader() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active fw-bold text-accent' : '';

  return (
    <>
      <style>{`
        @media (min-width: 992px) {
          .nav-item.dropdown:hover .dropdown-menu {
            display: block;
            margin-top: 0; 
          }
        }
      `}</style>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary shadow-sm py-3">
        <div className="container-fluid px-4">
          <Link className="navbar-brand d-flex align-items-center p-0" to="/">
            <img src={Logo} alt="Logo" width="100" height="55" />
          </Link>

          {/* Botón de colapso para móviles */}
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#publicNavbar" 
            aria-controls="publicNavbar" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="publicNavbar">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-2 align-items-lg-center">
              
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/')}`} to="/">
                  Inicio
                </Link>
              </li>

              <li className="nav-item">
                <Link className={`nav-link ${isActive('/catalogo')}`} to="/catalogo">
                  Catálogo
                </Link>
              </li>

              <li className="nav-item">
                <Link className={`nav-link ${isActive('/servicios')}`} to="/servicios">
                  Servicios
                </Link>
              </li>

              <li className="nav-item dropdown">
                <a 
                  className="nav-link dropdown-toggle" 
                  href="#" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  Marcas
                </a>
                <ul className="dropdown-menu dropdown-menu-dark bg-dark border-secondary shadow">
                  {marcas.map((marca) => (
                    <li key={marca.key}>
                      <Link className="dropdown-item" to={`/marcas/${marca.key}`}>
                        {marca.nombre}
                      </Link>
                    </li>
                  ))}
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <Link className="dropdown-item fw-semibold" to="/marcas">
                      Ver todas
                    </Link>
                  </li>
                </ul>
              </li>

{/* Dentro de contacto quiero que se pueda agendar el servicio quiero el menu desplegable */}
              <li className="nav-item dropdown">
                <a 
                  className="nav-link dropdown-toggle" 
                  href="#" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  Contactanos
                </a>
                <ul className="dropdown-menu dropdown-menu-dark bg-dark border-secondary shadow">
                  <li>
                    <Link className="dropdown-item" to="/servicios-contacto">
                      Agendar Servicio
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/contacto">
                      Contacto General
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a 
                  className="nav-link dropdown-toggle" 
                  href="#" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  Más
                </a>
                <ul className="dropdown-menu dropdown-menu-dark bg-dark border-secondary shadow">
                  <li>
                    <Link className="dropdown-item" to="/preguntas-frecuentes">
                      Preguntas Frecuentes
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/ayuda">
                      Ayuda
                    </Link>
                  </li>
                </ul>
              </li>
              
              <li className="nav-item d-none d-lg-block border-end border-secondary mx-2" style={{ height: '24px' }}></li>
              
              <li className="nav-item">
                <Link className="btn btn-primary btn-sm px-4" to="/login">
                  Iniciar sesión
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}