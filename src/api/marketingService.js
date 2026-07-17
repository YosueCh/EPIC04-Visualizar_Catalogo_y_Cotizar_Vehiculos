import api from "./axiosInstance";

export const marketingService = {
  // --- NOTICIAS (RULETA PRINCIPAL) ---
  
  getTodasLasNoticias: async () => {
    // Usamos directamente la instancia 'api' con la ruta relativa
    const response = await api.get('/api/noticias/todas'); 
    return response.data;
  },

  getNoticias: async () => {
    const response = await api.get('/api/noticias/ruleta');
    return response.data;
  },

  subirNoticia: async (formData) => {
    const response = await api.post('/api/noticias/subir', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  toggleActivoNoticia: async (id) => {
    const response = await api.put(`/api/noticias/toggle-activo/${id}`);
    return response.data;
  },

  eliminarNoticia: async (id) => {
    await api.delete(`/api/noticias/eliminar/${id}`);
  },

  // --- PROMOCIONES (TARJETAS) ---

  getTodasLasPromociones: async () => {
    const response = await api.get('/api/promociones/todas'); 
    return response.data;
  },

  getPromociones: async () => {
    const response = await api.get('/api/promociones/tarjetas');
    return response.data;
  },

  vincularPromocion: async (formData) => {
    const response = await api.post('/api/promociones/vincular', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  toggleActivoPromocion: async (id) => {
    const response = await api.put(`/api/promociones/toggle-activo/${id}`);
    return response.data;
  },

  eliminarPromocion: async (id) => {
    await api.delete(`/api/promociones/eliminar/${id}`);
  },

  getVehiculoInfo: async (id) => {
    const response = await api.get(`/api/promociones/vehiculo/${id}`);
    return response.data;
  },

  getVehiculosListado: async () => {
    const response = await api.get('/api/promociones/vehiculos-listado');
    return response.data;
  },

  actualizarPromocion: async (id, formData) => {
    const response = await api.put(`/api/promociones/actualizar/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },
};