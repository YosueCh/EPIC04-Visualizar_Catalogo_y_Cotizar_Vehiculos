// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// // Rutas para pages
// import Index from './pages/Index';
// import NotFound from './pages/error/Not_Found';
// // Rutas para Dashboard
// import Home from './pages/dashboard/Home';
// // Rutas para Auth
// import Register from './pages/auth/Register';
// // Rutas para Layout
// import LayoutAdmin from './components/Dashboard/LayoutAdmin';
// import PublicLayout from './components/PublicLayout';

// function App() {

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route element={<PublicLayout />}>
//           <Route path="/" element={<Index />} />
//           <Route path="/register" element={<Register />} />
//         </Route>

//         <Route path="/admin" element={<LayoutAdmin />}>
//           <Route index element={<Home />} />
//           <Route path="home" element={<Home />} />
//         </Route>
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Rutas para pages
import Index from './pages/Index';
import NotFound from './pages/error/Not_Found';
// Rutas para Dashboard
import Home from './pages/dashboard/Home';
import Contacto_Dash from './pages/dashboard/Contacto-Dash';
import Crud_Servicios from './pages/dashboard/Crud_Servicios';
import ServiciosContacto from './pages/Contacto/ServiciosContacto';
import Citas_Servicios from './pages/dashboard/Citas_Servicios';
import Cotizaciones_Vehiculos from './pages/dashboard/Cotizaciones_Vehiculos';

// Rutas para Auth
import Login from './pages/auth/Login/Login';
import Register from './pages/auth/Register/Register';
import Callback from './pages/auth/Callback/Callback';
// Rutas para Layout
import LayoutAdmin from './components/Dashboard/LayoutAdmin';
import PublicLayout from './components/PublicLayout';
// Auth
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Catalogo from './pages/Catalogo/Catalogo';
import CotizarVehiculo from './pages/Catalogo/CotizarVehiculo';
import Contacto from './pages/Contacto/Contacto';
import Marcas from './pages/Marcas/Marcas';
import MarcaDetalle from './pages/MarcaDetalle/MarcaDetalle';
import PreguntasFrecuentes from './pages/PreguntasFrecuentes/PreguntasFrecuentes';
import Ayuda from './pages/Ayuda/Ayuda';
import Servicios from './pages/Servicios/Servicios';
import MarketingDashboard from './pages/dashboard/MarketingDashboard';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/catalogo/cotizar" element={<CotizarVehiculo />} />
            <Route path="/marcas" element={<Marcas />} />
            <Route path="/marcas/:marcaKey" element={<MarcaDetalle />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
            <Route path="/ayuda" element={<Ayuda />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/servicios-contacto" element={<ServiciosContacto />} />
          </Route>

          <Route element={<ProtectedRoute requireAdmin />}>
            <Route path="/admin" element={<LayoutAdmin />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="marketing" element={<MarketingDashboard />} />
              <Route path="crud-servicios" element={<Crud_Servicios />} />
              <Route path="citas-servicios" element={<Citas_Servicios />} />
              <Route path="cotizaciones" element={<Cotizaciones_Vehiculos />} />
              <Route path="contacto" element={<Contacto_Dash />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;