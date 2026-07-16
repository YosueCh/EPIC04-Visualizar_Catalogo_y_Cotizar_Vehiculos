import { useContactAdmin } from '../../hooks/useContactAdmin';

export default function Contacto_Dash() {
  const { 
    contactData, 
    editando, 
    mensaje, 
    errores,
    cargando,
    formatearTelefono,
    handleEdit, 
    handleCancel, 
    handleChange,
    handleBloqueChange,
    agregarBloque,
    eliminarBloque,
    handleSave 
  } = useContactAdmin();

  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  
  // Generar opciones de horas en formato 12 horas
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

  if (cargando) {
    return (
        <div className="container py-4">
        <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Cargando...</span>
            </div>
        </div>
        </div>
        );
    }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Gestionar Contacto</h2>
        {!editando && (
          <button className="btn btn-danger" onClick={handleEdit}>
            <i className="bi bi-pencil me-2"></i>
            Editar datos
          </button>
        )}
      </div>

      {mensaje && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {mensaje}
          <button type="button" className="btn-close" onClick={() => setMensaje('')}></button>
        </div>
      )}

      <div className="card bg-white border-0 shadow-sm rounded-4 p-4">
        <div className="d-flex align-items-center gap-2 mb-4 pb-2 border-bottom">
            <i className="bi bi-wrench-adjustable text-danger"></i>
            <span className="small fw-bold text-uppercase tracking-wider text-secondary" style={{ fontSize: '11px' }}>
            Contacto
            </span>
        </div>

        {!editando ? (
            <div className="row g-3">
                <div className="col-12 col-md-6">
                <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3 border">
                    <i className="bi bi-telephone-fill text-danger fs-5"></i>
                    <div>
                    <label className="text-secondary small d-block mb-1">Teléfono</label>
                    <span className="fw-semibold text-dark">{formatearTelefono(contactData.telefono)}</span>
                    </div>
                </div>
                </div>
                <div className="col-12 col-md-6">
                <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3 border">
                    <i className="bi bi-envelope-fill text-danger fs-5"></i>
                    <div>
                    <label className="text-secondary small d-block mb-1">Email</label>
                    <span className="fw-semibold text-dark">{contactData.email}</span>
                    </div>
                </div>
                </div>
                <div className="col-12 col-md-6">
                <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3 border">
                    <i className="bi bi-geo-alt-fill text-danger fs-5"></i>
                    <div>
                    <label className="text-secondary small d-block mb-1">Dirección</label>
                    <span className="fw-semibold text-dark">{contactData.direccion}</span>
                    </div>
                </div>
                </div>
                <div className="col-12">
                <div className="p-3 bg-light rounded-3 border">
                    <label className="text-secondary small d-block mb-2">Horario de atención</label>
                    {contactData.bloquesHorario.map((bloque, index) => {
                    const horaInicio = horas.find(h => h.value === bloque.horaInicio);
                    const horaFin = horas.find(h => h.value === bloque.horaFin);
                    return (
                        <div key={index} className="fw-semibold text-dark mb-1">
                        {bloque.diaInicio} a {bloque.diaFin}: {horaInicio?.label || bloque.horaInicio} - {horaFin?.label || bloque.horaFin}
                        </div>
                    );
                    })}
                </div>
                </div>
            </div>
        ) : (
            <form onSubmit={handleSave}>
            <div className="row g-3">
                <div className="col-12 col-md-6">
                <label className="form-label small fw-semibold text-secondary">Teléfono (10 dígitos)</label>
                <input
                    type="text"
                    name="telefono"
                    className={`form-control border-secondary ${errores.telefono ? 'is-invalid' : ''}`}
                    value={contactData.telefono}
                    onChange={handleChange}
                    placeholder="4421234567"
                    maxLength="10"
                    required
                />
                {errores.telefono && (
                    <div className="invalid-feedback">{errores.telefono}</div>
                )}
                <small className="text-secondary">Ingresa solo los 10 dígitos (sin +52)</small>
                </div>
                <div className="col-12 col-md-6">
                <label className="form-label small fw-semibold text-secondary">Email</label>
                <input
                    type="email"
                    name="email"
                    className={`form-control border-secondary ${errores.email ? 'is-invalid' : ''}`}
                    value={contactData.email}
                    onChange={handleChange}
                    placeholder="contacto@ejemplo.com"
                    required
                />
                {errores.email && (
                    <div className="invalid-feedback">{errores.email}</div>
                )}
                </div>
                <div className="col-12 col-md-6">
                <label className="form-label small fw-semibold text-secondary">Dirección</label>
                <input
                    type="text"
                    name="direccion"
                    className="form-control border-secondary"
                    value={contactData.direccion}
                    onChange={handleChange}
                    placeholder="Ciudad, Estado, País"
                    required
                />
                </div>
                
                {/* Horario semanal estilo imagen */}
                <div className="col-12">
                <div className="bg-light p-4 rounded-3">
                    <label className="form-label small fw-semibold text-secondary mb-3">Horario semanal</label>
                    <p className="text-secondary small mb-4">Define la disponibilidad semanal que comúnmente utilizas.</p>
                    
                    {contactData.bloquesHorario.map((bloque, index) => (
                    <div key={index} className="mb-3 p-3 bg-white rounded-3 border">
                        <div className="row g-3 align-items-end">
                        <div className="col-12 col-md-3">
                            <label className="form-label small fw-semibold text-secondary">Disponible</label>
                            <div className="d-flex gap-2">
                            <select
                                className="form-select form-select-sm border-secondary"
                                value={bloque.diaInicio}
                                onChange={(e) => handleBloqueChange(index, 'diaInicio', e.target.value)}
                            >
                                {diasSemana.map(dia => (
                                <option key={dia} value={dia}>{dia}</option>
                                ))}
                            </select>
                            <span className="d-flex align-items-center text-secondary fw-bold">a</span>
                            <select
                                className="form-select form-select-sm border-secondary"
                                value={bloque.diaFin}
                                onChange={(e) => handleBloqueChange(index, 'diaFin', e.target.value)}
                            >
                                {diasSemana.map(dia => (
                                <option key={dia} value={dia}>{dia}</option>
                                ))}
                            </select>
                            </div>
                        </div>
                        <div className="col-12 col-md-3">
                            <select
                            className="form-select form-select-sm border-secondary"
                            value={bloque.horaInicio}
                            onChange={(e) => handleBloqueChange(index, 'horaInicio', e.target.value)}
                            >
                            {horas.map(hora => (
                                <option key={hora.value} value={hora.value}>{hora.label}</option>
                            ))}
                            </select>
                        </div>
                        <div className="col-12 col-md-1 d-flex align-items-center justify-content-center">
                            <span className="text-secondary fw-bold">a</span>
                        </div>
                        <div className="col-12 col-md-3">
                            <select
                            className="form-select form-select-sm border-secondary"
                            value={bloque.horaFin}
                            onChange={(e) => handleBloqueChange(index, 'horaFin', e.target.value)}
                            >
                            {horas.map(hora => (
                                <option key={hora.value} value={hora.value}>{hora.label}</option>
                            ))}
                            </select>
                        </div>
                        <div className="col-12 col-md-2 d-flex justify-content-end">
                            <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => eliminarBloque(index)}
                            disabled={contactData.bloquesHorario.length <= 1}
                            >
                            <i className="bi bi-trash"></i>
                            </button>
                        </div>
                        </div>
                    </div>
                    ))}

                    <button
                    type="button"
                    className="btn btn-outline-secondary w-100 mt-2"
                    onClick={agregarBloque}
                    >
                    <i className="bi bi-plus-circle me-2"></i>
                    Agregar bloque de tiempo
                    </button>
                </div>
                </div>

                <div className="col-12 d-flex gap-2 mt-3">
                <button type="submit" className="btn btn-danger px-4">
                    <i className="bi bi-check2 me-2"></i>
                    Guardar cambios
                </button>
                <button type="button" className="btn btn-secondary px-4" onClick={handleCancel}>
                    Cancelar
                </button>
                </div>
            </div>
            </form>
        )}
        </div>
    </div>
  );
}