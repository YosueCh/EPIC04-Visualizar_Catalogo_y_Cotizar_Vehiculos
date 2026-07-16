import api from "./axiosInstance";

export async function getVehiculos() {
  const { data } = await api.get("/api/vehiculos");
  return data;
}

export async function getVehiculoPorId(id) {
  const { data } = await api.get(`/api/vehiculos/${id}`);
  return data;
}

export async function getVehiculosPorCategoria(nombreCategoria) {
  const { data } = await api.get("/api/vehiculos/filtrar/categoria", {
    params: { nombre: nombreCategoria },
  });
  return data;
}

export async function getVehiculosPorMarca(nombreMarca) {
  const { data } = await api.get("/api/vehiculos/filtrar/marca", {
    params: { nombre: nombreMarca },
  });
  return data;
}

export async function getMarcas() {
  const { data } = await api.get("/api/vehiculos/marcas");
  return data;
}

export async function getCategorias() {
  const { data } = await api.get("/api/vehiculos/categorias");
  return data;
}