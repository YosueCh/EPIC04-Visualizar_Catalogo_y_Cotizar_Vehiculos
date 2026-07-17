import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getServicios, agendarCitaServicio } from '../../services/servicios';

export default function ServiciosContacto() {
  const location = useLocation();
  const [servicios, setServicios] = useState([]);
  const [form, setForm] = useState({
    nombreCliente: '',
    correo: '',
    telefono: '',
    marca: '',
    modelo: '',
    anio: '',
    fechaCita: '',
    mensaje: '',
    servicioId: ''
  });

  // Cargar catálogo para la lista desplegable
  useEffect(() => {
    const cargarSelect = async () => {
      const data = await getServicios();
      setServicios(data);
    };
    cargarSelect();
  }, []);

  // <-- 3. Escuchamos si viene un servicioId en la navegación para pre-seleccionarlo
  useEffect(() => {
    if (location.state && location.state.servicioId) {
      setForm(prevForm => ({
        ...prevForm,
        servicioId: location.state.servicioId.toString() // String para que haga match perfecto con el value del <select>
      }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombreCliente || !form.correo || !form.telefono || !form.marca || !form.modelo || !form.anio || !form.fechaCita || !form.servicioId) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, llena todos los campos obligatorios del vehículo y de contacto.',
        confirmButtonColor: '#e03a3e'
      });
      return;
    }

    try {
      const payload = {
        ...form,
        anio: parseInt(form.anio),
        servicioId: parseInt(form.servicioId)
      };

      await agendarCitaServicio(payload);

      Swal.fire({
        icon: 'success',
        title: '¡Cita Agendada!',
        text: 'Tu solicitud de cita ha sido registrada. Un asesor te contactará pronto.',
        confirmButtonColor: '#28a745'
      });

      setForm({
        nombreCliente: '',
        correo: '',
        telefono: '',
        marca: '',
        modelo: '',
        anio: '',
        fechaCita: '',
        mensaje: '',
        servicioId: ''
      });

    } catch (error) {
      console.error("Error al agendar cita:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error de Red',
        text: 'No se pudo registrar tu cita. Inténtalo más tarde.',
        confirmButtonColor: '#dc3545'
      });
    }
  };

  return (
    <div className="container py-5 bg-white text-dark" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
      
      <div className="row justify-content-center mb-4 text-center">
        <div className="col-12 col-md-8">
          <h1 className="fw-extrabold text-black mt-2 mb-3">Agenda tu Servicio Automotriz</h1>
          <p className="text-secondary opacity-75">
            Selecciona la asistencia que necesitas, introduce los datos de tu vehículo y elige el día de tu preferencia. Nuestro equipo te confirmará a la brevedad.
          </p>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-md-9 col-lg-7">
          <div className="card bg-black text-white p-4 p-md-5 shadow-lg rounded-4 border-0">
            <form onSubmit={handleSubmit}>
              
              <div className="row g-3 mb-3">
                <div className="col-12">
                  <label className="small text-white-50 mb-1">Nombre Completo</label>
                  <input type="text" name="nombreCliente" value={form.nombreCliente} onChange={handleChange} className="form-control bg-dark text-white border-secondary py-2" placeholder="Ej: Juan Pérez" />
                </div>
                <div className="col-6">
                  <label className="small text-white-50 mb-1">Correo Electrónico</label>
                  <input type="email" name="correo" value={form.correo} onChange={handleChange} className="form-control bg-dark text-white border-secondary py-2" placeholder="juan@example.com" />
                </div>
                <div className="col-6">
                  <label className="small text-white-50 mb-1">Teléfono</label>
                  <input type="tel" name="telefono" value={form.telefono} onChange={handleChange} className="form-control bg-dark text-white border-secondary py-2" placeholder="4421234567" />
                </div>
              </div>

              <div className="row g-2 mb-3">
                <div className="col-4">
                  <label className="small text-white-50 mb-1">Marca</label>
                  <input type="text" name="marca" value={form.marca} onChange={handleChange} className="form-control bg-dark text-white border-secondary py-2" placeholder="Ej: Nissan" />
                </div>
                <div className="col-4">
                  <label className="small text-white-50 mb-1">Modelo</label>
                  <input type="text" name="modelo" value={form.modelo} onChange={handleChange} className="form-control bg-dark text-white border-secondary py-2" placeholder="Ej: Versa" />
                </div>
                <div className="col-4">
                  <label className="small text-white-50 mb-1">Año</label>
                  <input type="number" name="anio" value={form.anio} onChange={handleChange} className="form-control bg-dark text-white border-secondary py-2" placeholder="2022" />
                </div>
              </div>

              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="small text-white-50 mb-1">Selecciona el Servicio</label>
                  <select name="servicioId" value={form.servicioId} onChange={handleChange} className="form-select bg-dark text-white border-secondary py-2">
                    <option value="">-- Seleccionar --</option>
                    {servicios.map(s => (
                      <option key={s.id} value={s.id}>{s.nombre} (${s.precioBase})</option>
                    ))}
                  </select>
                </div>
                <div className="col-6">
                  <label className="small text-white-50 mb-1">Fecha de la Cita</label>
                  <input type="date" name="fechaCita" value={form.fechaCita} onChange={handleChange} className="form-control bg-dark text-white border-secondary py-2" />
                </div>
              </div>

              <div className="mb-4">
                <label className="small text-white-50 mb-1">Notas o Síntomas del Vehículo (Opcional)</label>
                <textarea name="mensaje" value={form.mensaje} onChange={handleChange} rows="3" className="form-control bg-dark text-white border-secondary" placeholder="Cuéntanos más detalles del problema..."></textarea>
              </div>

              <button type="submit" className="btn btn-danger w-100 fw-bold py-2.5 rounded-3 text-uppercase" style={{ backgroundColor: '#e03a3e' }}>
                Enviar Solicitud de Cita
              </button>

            </form>
          </div>
        </div>
      </div>

    </div>
  );
}