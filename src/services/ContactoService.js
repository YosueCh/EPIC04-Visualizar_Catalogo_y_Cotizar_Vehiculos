const API_URL = 'http://localhost:8082/api/comercial/contacto';

export const contactoService = {
  // Obtener datos de contacto
  getContacto: async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Error al obtener datos de contacto');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getContacto:', error);
      throw error;
    }
  },

  // Actualizar datos de contacto
  updateContacto: async (data) => {
    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar datos de contacto');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en updateContacto:', error);
      throw error;
    }
  }
};