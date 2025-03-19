import React, { useState } from 'react';

const App = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    username: '',
    password: '',
    specializzazione: '',
    anniEsperienza: '',
    descrizione: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nomeCompleto)
      newErrors.nomeCompleto = 'Il nome completo è obbligatorio';
    if (!formData.username) newErrors.username = 'Lo username è obbligatorio';
    if (!formData.password) newErrors.password = 'La password è obbligatoria';
    if (!formData.specializzazione)
      newErrors.specializzazione = 'La specializzazione è obbligatoria';
    if (!formData.anniEsperienza || formData.anniEsperienza < 0)
      newErrors.anniEsperienza =
        'Gli anni di esperienza devono essere un numero positivo';
    if (!formData.descrizione)
      newErrors.descrizione = 'La descrizione è obbligatoria';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Dati del form:', formData);
    } else {
      console.log('Form non valido');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome completo:</label>
        <input
          type="text"
          name="nomeCompleto"
          value={formData.nomeCompleto}
          onChange={handleChange}
        />
        {errors.nomeCompleto && <span>{errors.nomeCompleto}</span>}
      </div>

      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <span>{errors.username}</span>}
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <span>{errors.password}</span>}
      </div>

      <div>
        <label>Specializzazione:</label>
        <select
          name="specializzazione"
          value={formData.specializzazione}
          onChange={handleChange}
        >
          <option value="">Seleziona</option>
          <option value="Full Stack">Full Stack</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
        </select>
        {errors.specializzazione && <span>{errors.specializzazione}</span>}
      </div>

      <div>
        <label>Anni di esperienza:</label>
        <input
          type="number"
          name="anniEsperienza"
          value={formData.anniEsperienza}
          onChange={handleChange}
        />
        {errors.anniEsperienza && <span>{errors.anniEsperienza}</span>}
      </div>

      <div>
        <label>Breve descrizione:</label>
        <textarea
          name="descrizione"
          value={formData.descrizione}
          onChange={handleChange}
        />
        {errors.descrizione && <span>{errors.descrizione}</span>}
      </div>

      <button type="submit">Registrati</button>
    </form>
  );
};

export default App;
