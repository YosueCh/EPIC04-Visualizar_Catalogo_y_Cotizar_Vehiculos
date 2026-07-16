import api from "./axiosInstance";

export async function crearCotizacion(payload) {
  const { data } = await api.post("/api/cotizaciones", payload);
  return data;
}

export async function listarCotizaciones() {
  const { data } = await api.get("/api/cotizaciones");
  return data;
}

export async function actualizarEstadoCotizacion(id, estado) {
  const { data } = await api.put(`/api/cotizaciones/${id}/estado`, null, {
    params: { estado },
  });
  return data;
}