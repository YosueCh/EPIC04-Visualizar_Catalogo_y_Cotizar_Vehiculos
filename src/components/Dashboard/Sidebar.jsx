import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import '../../assets/css/Sidebar.css';

const Sidebar = () => {
  const { logout } = useAuth();

  const navLinkStyle = {
    transition: 'all 0.3s ease',
    borderRadius: '8px',
  };

  return (
    <div className="bg-dark border-end d-flex flex-column" style={{ width: '250px', minHeight: 'calc(100vh - 56px)' }}>
      <ul className="nav flex-column p-3 flex-grow-1">
        {[
          { to: '/admin/home', icon: 'bi-house-door', label: 'Inicio' },
          { to: '/admin/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
          { to: '/admin/vehiculos', icon: 'bi-car-front-fill', label: 'Gestión Vehículos' },
          { to: '/admin/crud-servicios', icon: 'bi-wrench-adjustable', label: 'Servicios' },
          { to: '/admin/citas-servicios', icon: 'bi-calendar-event', label: 'Citas y Servicios' },
          { to: '/admin/marketing', icon: 'bi-megaphone', label: 'Marketing' },
          { to: '/admin/cotizaciones', icon: 'bi-file-earmark-text', label: 'Cotizaciones' },
          { to: '/admin/contacto', icon: 'bi-telephone', label: 'Contacto' },
        ].map((item, index) => (
          <li className="nav-item mb-1" key={index}>
            <Link
              className="nav-link text-white px-3 py-2 custom-hover"
              to={item.to}
              style={navLinkStyle}
            >
              <i className={`bi ${item.icon} me-2`}></i> {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="p-3 mt-auto border-top border-secondary">
        <button
          className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center"
          onClick={logout}
        >
          <i className="bi bi-box-arrow-left me-2"></i> Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;