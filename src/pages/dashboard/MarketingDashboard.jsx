import React, { useState, useEffect } from 'react';
import { marketingService } from '../../services/marketingService';

const MarketingDashboard = () => {
    const [noticias, setNoticias] = useState([]);
    const [promociones, setPromociones] = useState([]);
    const [loading, setLoading] = useState(false);

    // Almacena la lista de autos que llenará el desplegable
    const [listaVehiculos, setListaVehiculos] = useState([]);

    // Estados para los formularios
    const [archivoNoticia, setArchivoNoticia] = useState(null);
    const [urlNoticia, setUrlNoticia] = useState('');
    const [vehiculoId, setVehiculoId] = useState('');
    const [tipoDescuento, setTipoDescuento] = useState('FIJO');
    const [valorDescuento, setValorDescuento] = useState('');

    // Estados para la vista previa
    const [vehiculoPreview, setVehiculoPreview] = useState(null);

    // --- NUEVOS ESTADOS PARA EDICIÓN ---
    const [modoEdicion, setModoEdicion] = useState(false);
    const [promoEditId, setPromoEditId] = useState(null);

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            const dataNoticias = await marketingService.getTodasLasNoticias();
            const dataPromociones = await marketingService.getTodasLasPromociones();
            const dataVehiculos = await marketingService.getVehiculosListado();
            
            setNoticias(dataNoticias);
            setPromociones(dataPromociones);
            setListaVehiculos(dataVehiculos);
        } catch (error) {
            console.error("Error cargando datos:", error);
        }
    };

    // FUNCIÓN PARA CANCELAR EDICIÓN Y LIMPIAR
    const cancelarEdicion = () => {
        setModoEdicion(false);
        setPromoEditId(null);
        setVehiculoId('');
        setTipoDescuento('FIJO');
        setValorDescuento('');
        setVehiculoPreview(null);
    };

    // Detecta el cambio de auto en el selector
    const handleSeleccionVehiculo = (idSeleccionado) => {
        setVehiculoId(idSeleccionado);
        
        if (!idSeleccionado) {
            setVehiculoPreview(null);
            return;
        }

        const autoEncontrado = listaVehiculos.find(v => v.id === parseInt(idSeleccionado));
        setVehiculoPreview(autoEncontrado || null);
    };

    const handleGuardarNoticia = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            if (archivoNoticia) formData.append('archivo', archivoNoticia);
            if (urlNoticia) formData.append('imagenUrl', urlNoticia);

            await marketingService.subirNoticia(formData);
            setArchivoNoticia(null);
            setUrlNoticia('');
            cargarDatos();
        } catch (error) {
            alert('Error al subir el banner');
        } finally {
            setLoading(false);
        }
    };

    const handleGuardarPromocion = async (e) => {
        e.preventDefault();
        if (!vehiculoId) { alert("Debes seleccionar un vehículo de la lista."); return; }
        setLoading(true);
        try {
            const formData = new FormData();
            if (tipoDescuento) formData.append('tipoDescuento', tipoDescuento);
            if (valorDescuento) formData.append('valorDescuento', valorDescuento);

            if (modoEdicion) {
                // Lógica de Actualizar
                await marketingService.actualizarPromocion(promoEditId, formData);
            } else {
                // Lógica de Crear
                formData.append('vehiculoId', vehiculoId);
                await marketingService.vincularPromocion(formData);
            }
            
            cancelarEdicion(); 
            cargarDatos();
        } catch (error) {
            alert(modoEdicion ? 'Error al actualizar la promoción' : 'Error al crear la promoción');
        } finally {
            setLoading(false);
        }
    };

    // Carga los datos de la promoción seleccionada en el formulario para editar
    const handleEditarPromocion = (promo) => {
        setModoEdicion(true);
        setPromoEditId(promo.id);
        
        setVehiculoId(promo.vehiculoId);
        setTipoDescuento(promo.tipoDescuento);
        setValorDescuento(promo.valorDescuento);
        
        const autoEncontrado = listaVehiculos.find(v => v.id === parseInt(promo.vehiculoId));
        setVehiculoPreview(autoEncontrado || null);

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleToggleNoticia = async (id) => {
        await marketingService.toggleActivoNoticia(id);
        cargarDatos();
    };

    const handleTogglePromocion = async (id) => {
        await marketingService.toggleActivoPromocion(id);
        cargarDatos();
    };

    const handleEliminarNoticia = async (id) => {
        if (window.confirm('¿ELIMINAR por completo del servidor y BD? Esta acción no se puede deshacer.')) {
            await marketingService.eliminarNoticia(id);
            cargarDatos();
        }
    };

    const handleEliminarPromocion = async (id) => {
        if (window.confirm('¿ELIMINAR por completo del servidor y BD? Esta acción no se puede deshacer.')) {
            await marketingService.eliminarPromocion(id);
            cargarDatos();
        }
    };

    return (
        <div className="container-fluid mt-4">
            <h2 className="mb-4">Gestión de Marketing</h2>

            <div className="row">
                {/* COLUMNA 1: NOTICIAS */}
                <div className="col-md-6 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">Ruleta Principal (Noticias)</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleGuardarNoticia} className="mb-4 p-3 border rounded bg-light">
                                <h6 className="mb-3">Agregar nuevo banner</h6>
                                <div className="mb-3">
                                    <label className="form-label text-muted small">Subir archivo físico</label>
                                    <input type="file" className="form-control form-control-sm" accept="image/jpeg, image/png, image/gif, image/webp" onChange={(e) => setArchivoNoticia(e.target.files[0])} />
                                </div>
                                <div className="mb-3 text-center text-muted small fw-bold">Ó</div>
                                <div className="mb-3">
                                    <label className="form-label text-muted small">URL de Internet</label>
                                    <input type="text" className="form-control form-control-sm" value={urlNoticia} onChange={(e) => setUrlNoticia(e.target.value)} placeholder="https://..." />
                                </div>
                                <button type="submit" className="btn btn-primary btn-sm w-100" disabled={loading}>
                                    {loading ? 'Procesando...' : 'Subir Banner'}
                                </button>
                            </form>

                            <h6 className="fw-bold text-secondary border-bottom pb-2">Banners Registrados ({noticias.length})</h6>
                            {noticias.length === 0 ? (
                                <p className="text-muted small">No hay noticias en la base de datos.</p>
                            ) : (
                                <ul className="list-group">
                                    {noticias.map(not => (
                                        <li key={not.id} className="list-group-item d-flex justify-content-between align-items-center">
                                            <img src={not.imagenUrl} alt="Banner" style={{ height: '50px', width: '120px', objectFit: 'cover', borderRadius: '4px', opacity: not.activo ? 1 : 0.4 }} />
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="form-check form-switch m-0 d-flex align-items-center gap-2">
                                                    <input className="form-check-input mt-0" type="checkbox" role="switch" checked={not.activo} onChange={() => handleToggleNoticia(not.id)} style={{ cursor: 'pointer' }} />
                                                    <label className="form-check-label small text-muted mb-0" style={{ cursor: 'pointer', minWidth: '45px' }}>{not.activo ? 'Pública' : 'Oculta'}</label>
                                                </div>
                                                <button className="btn btn-outline-danger btn-sm" onClick={() => handleEliminarNoticia(not.id)} title="Borrar totalmente">
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>

                {/* COLUMNA 2: PROMOCIONES */}
                <div className="col-md-6 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-success text-white">
                            <h5 className="mb-0">Tarjetas de Promoción</h5>
                        </div>
                        <div className="card-body">
                            
                            {/* FORMULARIO ADAPTADO PARA CREAR Y EDITAR */}
                            <form onSubmit={handleGuardarPromocion} className={`mb-4 p-3 border rounded ${modoEdicion ? 'bg-warning bg-opacity-10 border-warning' : 'bg-light'}`}>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h6 className={`mb-0 fw-bold ${modoEdicion ? 'text-warning text-dark' : 'text-success'}`}>
                                        {modoEdicion ? '✏️ Editando Promoción' : 'Crear nueva promoción'}
                                    </h6>
                                    {modoEdicion && (
                                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={cancelarEdicion}>
                                            Cancelar
                                        </button>
                                    )}
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label fw-bold text-dark small">Selecciona el Vehículo</label>
                                    <select 
                                        className="form-select form-select-sm border-success fw-medium"
                                        value={vehiculoId}
                                        onChange={(e) => handleSeleccionVehiculo(e.target.value)}
                                        required
                                        disabled={modoEdicion}
                                    >
                                        <option value="">-- Selecciona un auto del inventario --</option>
                                        {listaVehiculos.map(v => (
                                            <option key={v.id} value={v.id}>
                                                {v.marcaVehiculo} {v.modelo} ({v.anio}) - ${Number(v.precioOriginal).toLocaleString('es-MX')}
                                            </option>
                                        ))}
                                    </select>
                                    {modoEdicion && <small className="text-muted" style={{fontSize: '0.70rem'}}>No puedes cambiar el vehículo de una promoción existente.</small>}
                                </div>

                                {/* TARJETA DE VISTA PREVIA INSTANTÁNEA */}
                                <div className="mb-4" style={{ minHeight: '85px' }}> 
                                    {vehiculoPreview && (
                                        <div className="d-flex align-items-center p-2 border border-success rounded bg-white shadow-sm">
                                            <img src={vehiculoPreview.imagenUrl} alt="Preview" style={{width: '90px', height: '70px', objectFit: 'cover', borderRadius: '4px'}} className="me-3" />
                                            <div className="d-flex flex-column overflow-hidden">
                                                <span className="fw-bold text-dark" style={{fontSize: '0.85rem'}}>{vehiculoPreview.marcaVehiculo} {vehiculoPreview.modelo} ({vehiculoPreview.anio})</span>
                                                <div className="d-flex gap-2 text-muted mb-1" style={{fontSize: '0.75rem'}}>
                                                    <span className="badge bg-secondary">{vehiculoPreview.categoriaVehiculo}</span>
                                                    <span className="fw-medium">Precio Base: ${Number(vehiculoPreview.precioOriginal).toLocaleString('es-MX')}</span>
                                                </div>
                                                <span className="text-muted text-truncate" style={{fontSize: '0.70rem', maxWidth: '300px'}} title={vehiculoPreview.descripcion}>{vehiculoPreview.descripcion}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="row bg-white p-2 rounded border mb-3 mx-0">
                                    <div className="col-6">
                                        <label className="form-label text-muted small">Tipo Descuento</label>
                                        <select className="form-select form-select-sm" value={tipoDescuento} onChange={(e) => setTipoDescuento(e.target.value)}>
                                            <option value="FIJO">Monto Fijo ($)</option>
                                            <option value="PORCENTAJE">Porcentaje (%)</option>
                                        </select>
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label text-muted small">Valor a Descontar</label>
                                        <input type="number" className="form-control form-control-sm" value={valorDescuento} onChange={(e) => setValorDescuento(e.target.value)} placeholder={tipoDescuento === 'PORCENTAJE' ? "Ej: 10" : "Ej: 15000"} required />
                                    </div>
                                </div>

                                <button type="submit" className={`btn btn-sm w-100 fw-bold ${modoEdicion ? 'btn-warning text-dark' : 'btn-success'}`} disabled={loading}>
                                    {loading ? 'Procesando...' : (modoEdicion ? 'Guardar Cambios' : 'Crear Oferta')}
                                </button>
                            </form>

                            {/* LISTA VISUAL CON SWITCHES Y BOTÓN EDITAR */}
                            <h6 className="fw-bold text-secondary border-bottom pb-2">Promociones Registradas ({promociones.length})</h6>
                            {promociones.length === 0 ? (
                                <p className="text-muted small">No hay promociones en la base de datos.</p>
                            ) : (
                                <ul className="list-group">
                                    {promociones.map(promo => (
                                        <li key={promo.id} className="list-group-item d-flex justify-content-between align-items-center p-2">
                                            <div className="d-flex align-items-center w-100">
                                                <img src={promo.imagenUrlPromo || promo.imagenVehiculoUrl} alt="Promo" style={{ height: '70px', width: '100px', objectFit: 'cover', marginRight: '15px', borderRadius: '6px', opacity: promo.activo ? 1 : 0.4 }} />
                                                <div className="d-flex flex-column flex-grow-1">
                                                    <span className="fw-bold text-dark mb-1">{promo.marcaVehiculo} {promo.modeloVehiculo}</span>
                                                    <div className="d-flex gap-1 mb-1">
                                                        <span className="badge bg-secondary" style={{fontSize: '0.65rem'}}>{promo.categoriaVehiculo}</span>
                                                        <span className="badge bg-danger" style={{fontSize: '0.65rem'}}>
                                                            {promo.tipoDescuento === 'PORCENTAJE' ? `${promo.valorDescuento}% OFF` : `-$${promo.valorDescuento}`}
                                                        </span>
                                                    </div>
                                                    <div className="small">
                                                        {promo.precioOriginal && <span className="text-decoration-line-through text-muted me-2" style={{ fontSize: '0.75rem' }}>${Number(promo.precioOriginal).toLocaleString('es-MX')}</span>}
                                                        {promo.precioFinal && <span className="text-success fw-bold">${Number(promo.precioFinal).toLocaleString('es-MX')}</span>}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="d-flex align-items-center gap-2 ms-3">
                                                <div className="form-check form-switch m-0 d-flex align-items-center gap-2 me-2">
                                                    <input className="form-check-input mt-0" type="checkbox" role="switch" checked={promo.activo} onChange={() => handleTogglePromocion(promo.id)} style={{ cursor: 'pointer' }} />
                                                    <label className="form-check-label small text-muted mb-0" style={{ cursor: 'pointer', minWidth: '45px' }}>{promo.activo ? 'Pública' : 'Oculta'}</label>
                                                </div>
                                                
                                                {/* BOTÓN AZUL PARA EDITAR */}
                                                <button className="btn btn-outline-primary btn-sm" onClick={() => handleEditarPromocion(promo)} title="Editar Promoción">
                                                    <i className="bi bi-pencil-square"></i>
                                                </button>
                                                
                                                <button className="btn btn-outline-danger btn-sm" onClick={() => handleEliminarPromocion(promo.id)} title="Borrar"><i className="bi bi-trash"></i></button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketingDashboard;