import React, { useState, useEffect } from 'react';

const RatingForm = () => {
  const [formData, setFormData] = useState({
    beerName: '',
    tasteRating: '',
    overallRating: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));

    fetch('http://localhost:3000/formRating', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  useEffect(() => {
  }, []); 
  
  return (
    <form onSubmit={handleSubmit}>
       <label htmlFor="beerName">Oceniane piwo:</label>
      <select
        id="beerName"
        name="beerName"
        required
        value={formData.beerName}
        onChange={handleInputChange}
      >
        <option value="" disabled>Wybierz oceniane piwo</option>
        <option value="Zywiec">Żywiec</option>
        <option value="Namyslow">Namysłów</option>
        <option value="Lomza">Łomża</option>
        <option value="Grimbergen">Grimbergen</option>
      </select>
      <br />

      <label htmlFor="tasteRating">Ocena Smaku:</label>
      <select
        id="tasteRating"
        name="tasteRating"
        required
        value={formData.tasteRating}
        onChange={handleInputChange}
      >
        <option value="" disabled selected>Wybierz ocenę ogólną</option>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
      <label htmlFor="overallRating">Ocena Ogólna:</label>
      <select
        id="overallRating"
        name="overallRating"
        required
        value={formData.overallRating}
        onChange={handleInputChange}
      >
          <option value="" disabled selected>Wybierz ocenę ogólną</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
      </select>
      <br/>

      <input type="submit" value="Oceń Piwo"/>
    </form>
  );
};

export default RatingForm;
