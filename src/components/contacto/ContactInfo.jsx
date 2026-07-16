import { useContactAdmin } from '../../hooks/useContactAdmin';

export default function ContactInfo() {
  const { contactData, formatearTelefono, cargando } = useContactAdmin();

  if (cargando) {
    return (
      <div className="col-12 col-lg-6">
        <div className="text-center py-5">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }

  // Formatear horarios para mostrar
  const formatearHorarios = () => {
    const horas = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j += 30) {
        const hora = String(i).padStart(2, '0');
        const minuto = String(j).padStart(2, '0');
        const hora12 = i === 0 ? 12 : i > 12 ? i - 12 : i;
        const ampm = i >= 12 ? 'PM' : 'AM';
        horas.push({
          value: `${hora}:${minuto}`,
          label: `${hora12}:${String(minuto).padStart(2, '0')} ${ampm}`
        });
      }
    }

    return contactData.bloquesHorario.map(bloque => {
      const horaInicio = horas.find(h => h.value === bloque.horaInicio);
      const horaFin = horas.find(h => h.value === bloque.horaFin);
      return `${bloque.diaInicio} a ${bloque.diaFin}: ${horaInicio?.label || bloque.horaInicio} - ${horaFin?.label || bloque.horaFin}`;
    }).join(' | ');
  };

  return (
    <div className="col-12 col-lg-6">
      <div className="d-flex align-items-center gap-2 mb-2 text-danger">
        <i className="bi bi-wrench-adjustable"></i>
        <span className="small fw-bold text-uppercase tracking-wider" style={{ fontSize: '11px' }}>
          Contacto
        </span>
      </div>
      <h2 className="fw-bold text-black mb-3">¿Listo para tu próximo vehículo?</h2>
      <p className="text-secondary mb-4">
        Escríbenos y un asesor te ayudará a encontrar la unidad que se ajusta a lo que necesitas.
      </p>

      <ul className="list-unstyled d-flex flex-column gap-3">
        <li className="d-flex align-items-center gap-3">
          <span className="contact-icon"><i className="bi bi-telephone-fill"></i></span>
          <span className="text-dark">{formatearTelefono(contactData.telefono)}</span>
        </li>
        <li className="d-flex align-items-center gap-3">
          <span className="contact-icon"><i className="bi bi-envelope-fill"></i></span>
          <span className="text-dark">{contactData.email}</span>
        </li>
        <li className="d-flex align-items-center gap-3">
          <span className="contact-icon"><i className="bi bi-geo-alt-fill"></i></span>
          <span className="text-dark">{contactData.direccion}</span>
        </li>
        <li className="d-flex align-items-center gap-3">
          <span className="contact-icon"><i className="bi bi-clock-fill"></i></span>
          <span className="text-dark">Atención: {formatearHorarios()}</span>
        </li>
      </ul>
    </div>
  );
}