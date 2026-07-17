import { useNavigate } from 'react-router-dom';
import './ServicioCard.css';

export default function ServicioCard({ servicio }) {
  // Extraemos también el 'id' del objeto servicio
  const { id, nombre, descripcion, precioBase, imagenUrl } = servicio;
  const navigate = useNavigate();

  const handleCotizar = () => {
    // Redirige enviando el servicioId a través del state
    navigate('/servicios-contacto', { state: { servicioId: id } });
  };

  return (
    <div className="card bg-black border-dark h-100 shadow-lg overflow-hidden rounded-3 servicio-card">
      
      {/* Imagen del servicio */}
      <img
        src={imagenUrl || 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80'}
        className="card-img-top"
        alt={nombre}
        style={{ height: '200px', objectFit: 'cover', filter: 'brightness(85%)' }}
      />

      <div className="card-body p-4 text-white d-flex flex-column justify-content-between">
        <div>
          <h4 className="card-title fw-bold mb-3">{nombre}</h4>
          
          <div className="spec-sheet mb-4">
            <p className="text-white-50 small" style={{ lineHeight: '1.6', minHeight: '60px' }}>
              {descripcion}
            </p>
          </div>
        </div>

        {/* Sección inferior con el precio formateado y el botón */}
        <div className="d-flex justify-content-between align-items-center border-top border-secondary pt-3">
          <span className="fw-bold text-danger fs-5">
            Desde ${precioBase ? precioBase.toLocaleString() : '0'}
          </span>
          <button className="btn btn-outline-light btn-sm fw-semibold" onClick={handleCotizar}>
            Cotizar <i className="bi bi-chevron-right small ms-1"></i>
          </button>
        </div>

      </div>
    </div>
  );
}