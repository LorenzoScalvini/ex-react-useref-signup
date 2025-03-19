import React, { useState, useRef, useEffect } from 'react';
import styles from './App.module.css'; // Importo il file CSS per lo stile

export default function App() {
  // Stato per gestire i campi controllati (username, password, descrizione)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    descrizione: '',
  });

  // Stato per gestire gli errori di validazione
  const [errors, setErrors] = useState({});

  // Stato per gestire i messaggi di conferma (es. "Username valido!")
  const [validationMessages, setValidationMessages] = useState({});

  // Uso useRef per gestire i campi non controllati (nomeCompleto, specializzazione, anniEsperienza)
  const nomeCompletoRef = useRef(null);
  const specializzazioneRef = useRef(null);
  const anniEsperienzaRef = useRef(null);

  // Uso useRef anche per il form, per permettere lo scroll verso l'alto
  const formRef = useRef(null);

  // Stringhe di riferimento per la validazione della password
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()-_=+[]{}|;:\'",.<>?/`~';

  // Focus automatico sul campo "Nome completo" quando la pagina viene caricata
  useEffect(() => {
    nomeCompletoRef.current.focus();
  }, []);

  // Funzione per gestire i cambiamenti nei campi controllati
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validazione in tempo reale
    if (name === 'username') validateUsername(value);
    if (name === 'password') validatePassword(value);
    if (name === 'descrizione') validateDescription(value);
  };

  // Funzione per validare l'username
  const validateUsername = (username) => {
    const newErrors = { ...errors };
    const newMessages = { ...validationMessages };

    // Controllo che l'username abbia almeno 6 caratteri e contenga solo lettere e numeri
    let isValid = true;

    if (username.length < 6) {
      isValid = false;
    } else {
      for (let char of username) {
        if (!letters.includes(char) && !numbers.includes(char)) {
          isValid = false;
          break;
        }
      }
    }

    if (!isValid) {
      newErrors.username =
        "L'username deve contenere almeno 6 caratteri alfanumerici.";
      newMessages.username = '';
    } else {
      delete newErrors.username;
      newMessages.username = 'Username valido!';
    }

    setErrors(newErrors);
    setValidationMessages(newMessages);
  };

  // Funzione per validare la password
  const validatePassword = (password) => {
    const newErrors = { ...errors };
    const newMessages = { ...validationMessages };

    // Controllo che la password contenga almeno una lettera, un numero e un simbolo
    let hasLetter = false;
    let hasNumber = false;
    let hasSymbol = false;

    for (let char of password) {
      if (letters.includes(char)) hasLetter = true;
      if (numbers.includes(char)) hasNumber = true;
      if (symbols.includes(char)) hasSymbol = true;
    }

    if (password.length < 8 || !hasLetter || !hasNumber || !hasSymbol) {
      newErrors.password =
        'La password deve contenere almeno 8 caratteri, 1 lettera, 1 numero e 1 simbolo.';
      newMessages.password = '';
    } else {
      delete newErrors.password;
      newMessages.password = 'Password valida!';
    }

    setErrors(newErrors);
    setValidationMessages(newMessages);
  };

  // Funzione per validare la descrizione
  const validateDescription = (description) => {
    const newErrors = { ...errors };
    const newMessages = { ...validationMessages };

    // Rimuovo gli spazi iniziali e finali e controllo la lunghezza
    const trimmedDescription = description.trim();
    if (trimmedDescription.length < 100 || trimmedDescription.length > 1000) {
      newErrors.descrizione =
        'La descrizione deve contenere tra 100 e 1000 caratteri.';
      newMessages.descrizione = '';
    } else {
      delete newErrors.descrizione;
      newMessages.descrizione = 'Descrizione valida!';
    }

    setErrors(newErrors);
    setValidationMessages(newMessages);
  };

  // Funzione per gestire il submit del form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Recupero i valori dei campi non controllati
    const nomeCompleto = nomeCompletoRef.current.value;
    const specializzazione = specializzazioneRef.current.value;
    const anniEsperienza = anniEsperienzaRef.current.value;

    // Validazione dei campi non controllati
    const newErrors = { ...errors };

    if (!nomeCompleto)
      newErrors.nomeCompleto = 'Il nome completo è obbligatorio';
    if (!specializzazione)
      newErrors.specializzazione = 'La specializzazione è obbligatoria';
    if (!anniEsperienza || anniEsperienza < 0)
      newErrors.anniEsperienza =
        'Gli anni di esperienza devono essere un numero positivo';

    // Validazione dei campi controllati
    if (!formData.username) newErrors.username = 'Lo username è obbligatorio';
    if (!formData.password) newErrors.password = 'La password è obbligatoria';
    if (!formData.descrizione)
      newErrors.descrizione = 'La descrizione è obbligatoria';

    setErrors(newErrors);

    // Se non ci sono errori, stampo i dati in console
    if (Object.keys(newErrors).length === 0) {
      const formDataFinal = {
        nomeCompleto,
        username: formData.username,
        password: formData.password,
        specializzazione,
        anniEsperienza,
        descrizione: formData.descrizione,
      };
      console.log('Dati del form:', formDataFinal);
    } else {
      console.log('Form non valido');
    }
  };

  // Funzione per resettare il form
  const handleReset = () => {
    setFormData({
      username: '',
      password: '',
      descrizione: '',
    });
    setErrors({});
    setValidationMessages({});
    nomeCompletoRef.current.value = '';
    specializzazioneRef.current.value = '';
    anniEsperienzaRef.current.value = '';
  };

  // Funzione per tornare all'inizio del form
  const scrollToTop = () => {
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={formRef}>
      <form onSubmit={handleSubmit}>
        {/* Campo Nome completo */}
        <div>
          <label>Nome completo:</label>
          <input type="text" name="nomeCompleto" ref={nomeCompletoRef} />
          {errors.nomeCompleto && <span>{errors.nomeCompleto}</span>}
        </div>

        {/* Campo Username */}
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <span>{errors.username}</span>}
          {validationMessages.username && (
            <span>{validationMessages.username}</span>
          )}
        </div>

        {/* Campo Password */}
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span>{errors.password}</span>}
          {validationMessages.password && (
            <span>{validationMessages.password}</span>
          )}
        </div>

        {/* Campo Specializzazione */}
        <div>
          <label>Specializzazione:</label>
          <select name="specializzazione" ref={specializzazioneRef}>
            <option value="">Seleziona</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
          </select>
          {errors.specializzazione && <span>{errors.specializzazione}</span>}
        </div>

        {/* Campo Anni di esperienza */}
        <div>
          <label>Anni di esperienza:</label>
          <input type="number" name="anniEsperienza" ref={anniEsperienzaRef} />
          {errors.anniEsperienza && <span>{errors.anniEsperienza}</span>}
        </div>

        {/* Campo Descrizione */}
        <div>
          <label>Breve descrizione:</label>
          <textarea
            name="descrizione"
            value={formData.descrizione}
            onChange={handleChange}
          />
          {errors.descrizione && <span>{errors.descrizione}</span>}
          {validationMessages.descrizione && (
            <span>{validationMessages.descrizione}</span>
          )}
        </div>

        {/* Pulsanti Submit e Reset */}
        <button type="submit">Registrati</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>

      {/* Freccia per tornare all'inizio del form */}
      <button className={styles.scrollToTop} onClick={scrollToTop}>
        ↑
      </button>
    </div>
  );
}
