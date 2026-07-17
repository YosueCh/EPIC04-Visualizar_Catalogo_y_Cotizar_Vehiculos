import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getCitasServiciosAdmin, cambiarEstadoCitaAdmin } from '../../services/servicios';

export default function Citas_Servicios() {
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtroNombre, setFiltroNombre] = useState('');

  const cargarCitas = async () => {
    try {
      const data = await getCitasServiciosAdmin();
      setCitas(data);
    } catch (error) {
      console.error("Error al cargar las agendas de citas:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error de Permisos o Red',
        text: 'No se pudieron recuperar las citas. Tu sesión pudo haber expirado.',
        confirmButtonColor: '#dc3545'
      });
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarCitas();
  }, []);

  const handleCambioEstado = async (id, estadoActual, nuevoEstado) => {
    if (estadoActual === nuevoEstado) return;

    Swal.fire({
      title: '¿Actualizar estado?',
      text: `¿Estás seguro de cambiar el estado de la cita a ${nuevoEstado}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, cambiar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await cambiarEstadoCitaAdmin(id, nuevoEstado);
          Swal.fire({
            icon: 'success',
            title: '¡Actualizado!',
            text: 'El estado de la cita se ha modificado correctamente.',
            timer: 1500,
            showConfirmButton: false
          });
          cargarCitas();
        } catch (error) {
          console.error("Error al actualizar estado con Axios:", error);
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar',
            text: 'No tienes los permisos necesarios o el servidor rechazó el cambio.',
            confirmButtonColor: '#dc3545'
          });
          cargarCitas();
        }
      } else {
        cargarCitas();
      }
    });
  };

  const citasFiltradas = citas.filter(cita =>
    cita.nombreCliente.toLowerCase().includes(filtroNombre.toLowerCase()) ||
    cita.marca.toLowerCase().includes(filtroNombre.toLowerCase())
  );

  if (cargando) {
    return <div className="text-center py-5 text-secondary">Cargando bitácora de citas...</div>;
  }

  return (
    <div className="citas-admin-container p-4 bg-white text-dark" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="text-black mb-1 fw-bold fs-3">Control de Citas de Taller</h1>
          <p className="text-secondary small m-0">Gestiona las solicitudes perimetrales recibidas desde el módulo comercial</p>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-6 col-md-4">
          <div className="card bg-light border-light shadow-sm p-3 rounded-3 text-center">
            <span className="small text-secondary fw-semibold text-uppercase">Total Recibidas</span>
            <h3 className="fw-bold text-black m-0 mt-1">{citas.length}</h3>
          </div>
        </div>
        <div className="col-6 col-md-4">
          <div className="card bg-light border-light shadow-sm p-3 rounded-3 text-center">
            <span className="small text-secondary fw-semibold text-uppercase">Pendientes</span>
            <h3 className="fw-bold text-warning m-0 mt-1">
              {citas.filter(c => c.estado === 'PENDIENTE' || !c.estado).length}
            </h3>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card bg-light border-light shadow-sm p-3 rounded-3 text-center">
            <span className="small text-secondary fw-semibold text-uppercase">Realizadas</span>
            <h3 className="fw-bold text-success m-0 mt-1">
              {citas.filter(c => c.estado === 'REALIZADO').length}
            </h3>
          </div>
        </div>
      </div>

      <div className="mb-4 bg-light p-3 rounded-3 border border-light">
        <div className="input-group">
          <span className="input-group-text bg-white border-end-0 text-secondary"><i className="bi bi-search"></i></span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Buscar por nombre del cliente o marca de vehículo..."
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
          />
        </div>
      </div>

      <div className="card bg-black border-dark shadow-lg rounded-3 text-white p-4">
        <h5 className="fw-bold mb-3 text-white-50">Listado de Solicitudes Activas</h5>
        
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle border-dark m-0">
            <thead>
              <tr className="text-white-50 border-bottom border-secondary small text-uppercase">
                <th scope="col">Cliente / Contacto</th>
                <th scope="col">Vehículo</th>
                <th scope="col">Servicio Requerido</th>
                <th scope="col">Fecha Sugerida</th>
                <th scope="col">Comentarios Cliente</th>
                <th scope="col" className="text-center" style={{ width: '160px' }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {citasFiltradas.map((cita) => {
                const estadoActual = cita.estado || 'PENDIENTE';
                return (
                  <tr key={cita.id} className="border-bottom border-dark">
                    <td>
                      <span className="fw-bold d-block text-white">{cita.nombreCliente}</span>
                      <small className="text-white-50 d-block"><i className="bi bi-envelope me-1"></i>{cita.correo}</small>
                      <small className="text-white-50 d-block"><i className="bi bi-telephone me-1"></i>{cita.telefono}</small>
                    </td>
                    <td>
                      <span className="fw-semibold text-white d-block">{cita.marca} - {cita.modelo}</span>
                      <small className="text-danger fw-bold">Año: {cita.anio}</small>
                    </td>
                    <td>
                      <span className="badge bg-primary text-dark fw-bold px-2 py-1.5 fs-7">
                        {cita.nombreServicio || `Servicio ID: ${cita.servicioId}`}
                      </span>
                    </td>
                    <td>
                      <span className="fw-bold text-white"><i className="bi bi-calendar3 me-1 text-info"></i> {cita.fechaCita || 'Sin fecha'}</span>
                    </td>
                    <td style={{ maxWidth: '250px' }}>
                      <p className="text-white-50 small m-0 text-truncate" title={cita.mensaje} style={{ fontSize: '0.85rem' }}>
                        {cita.mensaje || <em className="text-muted">Sin comentarios adicionales</em>}
                      </p>
                    </td>
                    
                    <td className="text-center">
                      <select 
                        value={estadoActual} 
                        onChange={(e) => handleCambioEstado(cita.id, estadoActual, e.target.value)}
                        className={`form-select form-select-sm fw-semibold text-center border-0 rounded-pill ${
                          estadoActual === 'REALIZADO' 
                            ? 'bg-success text-white' 
                            : 'bg-warning text-dark'
                        }`}
                        style={{ cursor: 'pointer' }}
                      >
                        <option value="PENDIENTE" className="bg-dark text-white">PENDIENTE</option>
                        <option value="REALIZADO" className="bg-dark text-white">REALIZADO</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
              
              {citasFiltradas.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-secondary">
                    <i className="bi bi-folder-x fs-2 d-block mb-2"></i>
                    No se encontraron registros de citas almacenados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}