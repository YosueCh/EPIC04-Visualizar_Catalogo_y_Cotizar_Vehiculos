import api from '../api/axiosInstance';

export const getServicios = async () => {
    try {
        const response = await api.get('/api/public/servicios');
        return response.data;
    } catch (error) {
        console.error("Error al obtener servicios con Axios:", error);
        return [];
    }
};

// POST privado de servicios
export const registrarServicio = async (nuevoServicio) => {
    const response = await api.post('/api/public/servicios', nuevoServicio);
    return response.data;
};

// PUT privado de servicios
export const modificarServicio = async (id, servicioEditado) => {
    const response = await api.put(`/api/public/servicios/${id}`, servicioEditado);
    return response.data;
};

// DELETE privado de servicios
export const borrarServicio = async (id) => {
    const response = await api.delete(`/api/public/servicios/${id}`);
    return response.data;
};

// POST para agendar una cita
export const agendarCitaServicio = async (datosCita) => {
    const response = await api.post('/api/public/citas-servicios', datosCita);
    return response.data;
};

// GET para obtener todas las citas
export const getCitasServiciosAdmin = async () => {
    const response = await api.get('/api/public/citas-servicios');
    return response.data;
};

export const cambiarEstadoCitaAdmin = async (id, nuevoEstado) => {
    const response = await api.put(`/api/public/citas-servicios/${id}/estado?estado=${nuevoEstado}`);
    return response.data;
};