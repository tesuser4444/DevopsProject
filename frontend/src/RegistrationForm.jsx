import React, { useState } from "react";
import axios from "axios";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file change
  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  // Validate inputs
  const validate = () => {
    const errors = {};

    // Full Name validation
    if (!formData.full_name.trim()) {
      errors.full_name = "El nombre completo es obligatorio.";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.full_name)) {
      errors.full_name = "El nombre completo solo puede contener letras y espacios.";
    }

    // Email validation
    if (!formData.email) {
      errors.email = "El correo electrónico es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Por favor, ingrese un correo electrónico válido.";
    }

    // Phone validation
    if (!formData.phone) {
      errors.phone = "El teléfono es obligatorio.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "El teléfono debe contener exactamente 10 dígitos.";
    }

    // Profile image validation
    if (!profileImage) {
      errors.profile_image = "La imagen de perfil es obligatoria.";
    } else if (!["image/jpeg", "image/png"].includes(profileImage.type)) {
      errors.profile_image = "Solo se permiten imágenes en formato JPEG o PNG.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const form = new FormData();
    form.append("full_name", formData.full_name);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("profile_image", profileImage);

    try {
      const response = await axios.post("http://localhost:8080/register", form);
      setMessage(response.data.message);
      setErrors({});
    } catch (error) {
      setMessage("Error en el registro: " + error.response?.data?.error || error.message);
    }
  };

  return (
    <div>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <input
            type="text"
            name="full_name"
            placeholder="Nombre completo"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
          {errors.full_name && <p className="error">{errors.full_name}</p>}
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
        <div>
          <input
            type="file"
            name="profile_image"
            onChange={handleFileChange}
            required
          />
          {errors.profile_image && <p className="error">{errors.profile_image}</p>}
        </div>
        <button type="submit">Registrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegistrationForm;