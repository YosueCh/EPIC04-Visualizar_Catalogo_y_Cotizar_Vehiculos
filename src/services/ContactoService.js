import api from "../api/axiosInstance";

// Endpoint base
const CONTACTO_URL = '/api/comercial/contacto';

export const contactoService = {
  // Obtener datos de contacto (público - no necesita token)
  getContacto: async () => {
    try {
      const response = await api.get(CONTACTO_URL);
      return response.data;
    } catch (error) {
      console.error('Error en getContacto:', error);
      // Propagar el error con mensaje amigable
      if (error.response?.status === 401) {
        throw new Error('No autorizado - Inicia sesión nuevamente');
      }
      if (error.response?.status === 404) {
        throw new Error('Datos de contacto no encontrados');
      }
      throw new Error(error.response?.data?.message || 'Error al obtener datos de contacto');
    }
  },

  // Actualizar datos de contacto (requiere rol ADMIN)
  updateContacto: async (data) => {
    try {
      const response = await api.put(CONTACTO_URL, data);
      return response.data;
    } catch (error) {
      console.error('Error en updateContacto:', error);
      // Manejar diferentes códigos de error
      if (error.response?.status === 401) {
        throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente');
      }
      if (error.response?.status === 403) {
        throw new Error('No tienes permisos de administrador para esta acción');
      }
      if (error.response?.status === 400) {
        throw new Error(error.response?.data?.message || 'Datos inválidos');
      }
      throw new Error(error.response?.data?.message || 'Error al actualizar datos de contacto');
    }
  }
};