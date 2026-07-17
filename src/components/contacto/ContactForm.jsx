import { useContactForm } from '../../hooks/useContactForm';
import './ContactForm.css';

export default function ContactForm() {
  const { formData, enviado, handleChange, handleSubmit } = useContactForm();

  // return (
  //   <div className="col-12 col-lg-6">
  //     <form className="card bg-black border-dark shadow-lg rounded-4 p-4 p-md-5" onSubmit={handleSubmit}>
  //       <div className="mb-3">
  //         <label className="form-label text-white-50 small">Nombre</label>
  //         <input
  //           type="text"
  //           name="nombre"
  //           className="form-control bg-dark text-white border-secondary"
  //           placeholder="Tu nombre"
  //           value={formData.nombre}
  //           onChange={handleChange}
  //           required
  //         />
  //       </div>
  //       <div className="mb-3">
  //         <label className="form-label text-white-50 small">Correo</label>
  //         <input
  //           type="email"
  //           name="correo"
  //           className="form-control bg-dark text-white border-secondary"
  //           placeholder="tucorreo@ejemplo.com"
  //           value={formData.correo}
  //           onChange={handleChange}
  //           required
  //         />
  //       </div>
  //       <div className="mb-3">
  //         <label className="form-label text-white-50 small">Mensaje</label>
  //         <textarea
  //           name="mensaje"
  //           className="form-control bg-dark text-white border-secondary"
  //           rows="4"
  //           placeholder="Cuéntanos qué vehículo buscas"
  //           value={formData.mensaje}
  //           onChange={handleChange}
  //           required
  //         ></textarea>
  //       </div>
  //       <button type="submit" className="btn btn-danger w-100 fw-semibold mt-2">
  //         Enviar mensaje
  //       </button>

  //       {enviado && (
  //         <p className="text-success small text-center mt-3 mb-0">
  //           Mensaje enviado. Te contactaremos pronto.
  //         </p>
  //       )}
  //     </form>
  //   </div>
  //);
}