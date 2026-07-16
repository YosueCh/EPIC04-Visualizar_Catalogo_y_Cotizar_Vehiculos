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
import Contacto from './pages/Contacto/Contacto';
import Marcas from './pages/Marcas/Marcas';
import MarcaDetalle from './pages/MarcaDetalle/MarcaDetalle';
import PreguntasFrecuentes from './pages/PreguntasFrecuentes/PreguntasFrecuentes';
import Ayuda from './pages/Ayuda/Ayuda';

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
            <Route path="/marcas" element={<Marcas />} />
            <Route path="/marcas/:marcaKey" element={<MarcaDetalle />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
            <Route path="/ayuda" element={<Ayuda />} />
          </Route>

          <Route path="/admin" element={<LayoutAdmin />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="contacto" element={<Contacto_Dash />} />
          </Route>
          {/* <Route element={<ProtectedRoute requireAdmin />}>
            <Route path="/admin" element={<LayoutAdmin />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
            </Route>
          </Route> */}

          <Route path="*" element={<NotFound />} />
        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;