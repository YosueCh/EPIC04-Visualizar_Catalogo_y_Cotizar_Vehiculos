import axios from 'axios';

// Apuntamos DIRECTAMENTE al microservicio ms-comercial
const API_URL = 'http://localhost:8082/api'; 

export const marketingService = {
  // --- NOTICIAS (RULETA PRINCIPAL) ---
  
  getTodasLasNoticias: async () => {
    const response = await axios.get(`${API_URL}/noticias/todas`); 
    return response.data;
  },

  getNoticias: async () => {
    const response = await axios.get(`${API_URL}/noticias/ruleta`);
    return response.data;
  },

  subirNoticia: async (formData) => {
    const response = await axios.post(`${API_URL}/noticias/subir`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  toggleActivoNoticia: async (id) => {
    const response = await axios.put(`${API_URL}/noticias/toggle-activo/${id}`);
    return response.data;
  },

  eliminarNoticia: async (id) => {
    await axios.delete(`${API_URL}/noticias/eliminar/${id}`);
  },

  // --- PROMOCIONES (TARJETAS) ---

  getTodasLasPromociones: async () => {
    const response = await axios.get(`${API_URL}/promociones/todas`); 
    return response.data;
  },

  getPromociones: async () => {
    const response = await axios.get(`${API_URL}/promociones/tarjetas`);
    return response.data;
  },

  vincularPromocion: async (formData) => {
    const response = await axios.post(`${API_URL}/promociones/vincular`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  toggleActivoPromocion: async (id) => {
    const response = await axios.put(`${API_URL}/promociones/toggle-activo/${id}`);
    return response.data;
  },

  eliminarPromocion: async (id) => {
    await axios.delete(`${API_URL}/promociones/eliminar/${id}`);
  },

  getVehiculoInfo: async (id) => {
    const response = await axios.get(`${API_URL}/promociones/vehiculo/${id}`);
    return response.data;
  },

  // Agrega esto dentro del objeto marketingService:
  getVehiculosListado: async () => {
    const response = await axios.get(`${API_URL}/promociones/vehiculos-listado`);
    return response.data;
  },

  // Agrega esto dentro del objeto marketingService:
  actualizarPromocion: async (id, formData) => {
    const response = await axios.put(`${API_URL}/promociones/actualizar/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },
};