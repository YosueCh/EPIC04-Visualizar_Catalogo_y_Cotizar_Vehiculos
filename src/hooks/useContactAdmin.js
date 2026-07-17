import { useState, useEffect } from 'react';
import { contactoService } from '../services/contactoService';

const INITIAL_CONTACT = {
  telefono: '4421234567',
  email: 'contacto@royalautocenter.com',
  direccion: 'Querétaro, Qro., México',
  bloquesHorario: [
    { diaInicio: 'Lunes', diaFin: 'Viernes', horaInicio: '09:00', horaFin: '17:00' }
  ]
};

export function useContactAdmin() {
  const [contactData, setContactData] = useState(INITIAL_CONTACT);
  const [editando, setEditando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(true);

  // =============================================
  // 1. PRIMERO: FUNCIÓN PARA CARGAR DATOS
  // =============================================
  const cargarContacto = async () => {
    try {
      setCargando(true);
      console.log('Cargando datos de contacto...');
      const data = await contactoService.getContacto();
      console.log('Datos recibidos:', data);
      if (data) {
        setContactData(data);
      } else {
        console.warn('No se recibieron datos, usando iniciales');
        setContactData(INITIAL_CONTACT);
      }
    } catch (error) {
      console.error('Error al cargar contacto:', error);
      setMensaje('Error al cargar los datos: ' + error.message);
      setTimeout(() => setMensaje(''), 3000);
      // En caso de error, mantener datos iniciales
      setContactData(INITIAL_CONTACT);
    } finally {
      setCargando(false);
    }
  };

  // =============================================
  // 2. SEGUNDO: useEffect PARA CARGAR AL INICIAR
  // =============================================
  useEffect(() => {
    cargarContacto();
  }, []);

  // =============================================
  // 3. RESTO DE FUNCIONES
  // =============================================
  const handleEdit = () => {
    setEditando(true);
    setMensaje('');
    setErrores({});
  };

  const handleCancel = () => {
    setEditando(false);
    cargarContacto();
    setMensaje('');
    setErrores({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let valorProcesado = value;

    if (name === 'telefono') {
      const soloNumeros = value.replace(/\D/g, '');
      if (soloNumeros.length <= 10) {
        valorProcesado = soloNumeros;
      } else {
        return;
      }
    }

    if (name === 'email') {
      valorProcesado = value;
    }

    setContactData(prev => ({ ...prev, [name]: valorProcesado }));
    
    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBloqueChange = (index, field, value) => {
    const nuevosBloques = [...contactData.bloquesHorario];
    nuevosBloques[index] = { ...nuevosBloques[index], [field]: value };
    setContactData(prev => ({ ...prev, bloquesHorario: nuevosBloques }));
  };

  const agregarBloque = () => {
    setContactData(prev => ({
      ...prev,
      bloquesHorario: [
        ...prev.bloquesHorario,
        { diaInicio: 'Lunes', diaFin: 'Viernes', horaInicio: '09:00', horaFin: '17:00' }
      ]
    }));
  };

  const eliminarBloque = (index) => {
    if (contactData.bloquesHorario.length > 1) {
      const nuevosBloques = contactData.bloquesHorario.filter((_, i) => i !== index);
      setContactData(prev => ({ ...prev, bloquesHorario: nuevosBloques }));
    }
  };

  const validarEmail = (email) => {
    const emailLimpio = email.trim();
    if (!emailLimpio) return 'El email es requerido';
    if (emailLimpio !== email) return 'El email no debe tener espacios al inicio o final';
    if (!emailLimpio.includes('@')) return 'El email debe contener @';
    if (emailLimpio.startsWith('@') || emailLimpio.endsWith('@')) return 'Email inválido';
    return '';
  };

  const validarTelefono = (telefono) => {
    const telefonoLimpio = telefono.replace(/\D/g, '');
    if (!telefonoLimpio) return 'El teléfono es requerido';
    if (telefonoLimpio.length !== 10) return 'El teléfono debe tener exactamente 10 dígitos';
    return '';
  };

  const validarCampos = () => {
    const nuevosErrores = {};
    
    const errorEmail = validarEmail(contactData.email);
    if (errorEmail) nuevosErrores.email = errorEmail;
    
    const errorTelefono = validarTelefono(contactData.telefono);
    if (errorTelefono) nuevosErrores.telefono = errorTelefono;
    
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    const emailLimpio = contactData.email.trim();
    if (emailLimpio !== contactData.email) {
      setContactData(prev => ({ ...prev, email: emailLimpio }));
    }
    
    if (!validarCampos()) {
      return;
    }
    
    try {
      const dataToSend = {
        telefono: contactData.telefono,
        email: contactData.email.trim(),
        direccion: contactData.direccion,
        bloquesHorario: contactData.bloquesHorario.map(bloque => ({
          diaInicio: bloque.diaInicio,
          diaFin: bloque.diaFin,
          horaInicio: bloque.horaInicio,
          horaFin: bloque.horaFin
        }))
      };

      await contactoService.updateContacto(dataToSend);
      
      setEditando(false);
      setMensaje('Datos de contacto actualizados correctamente');
      await cargarContacto();
      
      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      setMensaje('Error al guardar los datos: ' + error.message);
      setTimeout(() => setMensaje(''), 3000);
    }
  };

  const formatearTelefono = (telefono) => {
    const numeros = telefono.replace(/\D/g, '');
    if (numeros.length === 10) {
      return `+52 ${numeros.slice(0, 3)} ${numeros.slice(3, 6)} ${numeros.slice(6)}`;
    }
    return telefono;
  };

  return {
    contactData,
    editando,
    mensaje,
    errores,
    cargando,
    formatearTelefono,
    handleEdit,
    handleCancel,
    handleChange,
    handleBloqueChange,
    agregarBloque,
    eliminarBloque,
    handleSave
  };
}