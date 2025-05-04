import React, { useEffect, useState } from 'react';
import '../styles/registerDoctor.css';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { Autocomplete, LoadScript } from '@react-google-maps/api';

const libraries: ('places')[] = ['places'];

const specialties = [
  "Cardiologist", "Dermatologist", "Pediatrician", "Neurologist",
  "Orthopedic", "Oncologist", "Psychiatrist", "Ophthalmologist",
  "Dentist", "Gynecologist", "Surgeon", "General Practitioner"
];

const RegisterDoctor = () => {
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    docId: '',
    image: '',
    age: '',
    name: '',
    specialty: '',
    bio: '',
    email: '',
  });

  const [locationName, setLocationName] = useState('');
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setCoordinates({ lat, lng });
        setLocationName(place.formatted_address || place.name || '');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!coordinates) {
      alert('Please select a valid location from the suggestions.');
      return;
    }

    const doctorData = {
      ...formData,
      location: {
        name: locationName,
        latitude: coordinates.lat,
        longitude: coordinates.lng,
      },
    };

    try {
      await addDoc(collection(db, 'doctors'), doctorData);
      alert('Doctor registered successfully!');
      setFormData({
        docId: '',
        image: '',
        age: '',
        name: '',
        specialty: '',
        bio: '',
        email: '',
      });
      setLocationName('');
      setCoordinates(null);
    } catch (err) {
      console.error(err);
      alert('Failed to register doctor.');
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Avoid SSR issues

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!apiKey) return <p>Missing Google Maps API Key</p>;

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Register Doctor</h2>

          <input type="text" name="docId" placeholder="Doctor ID" value={formData.docId} onChange={handleChange} required />
          <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
          <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />

          <select name="specialty" value={formData.specialty} onChange={handleChange} required>
            <option value="">Select Specialty</option>
            {specialties.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>

          <textarea name="bio" placeholder="Bio" value={formData.bio} onChange={handleChange} required />

          <Autocomplete onLoad={(ac) => setAutocomplete(ac)} onPlaceChanged={handlePlaceChanged}>
            <input
              type="text"
              placeholder="Search Location"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              required
            />
          </Autocomplete>

          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <button type="submit">Add Doctor</button>
        </form>
      </div>
    </LoadScript>
  );
};

export default RegisterDoctor;
