import { useEffect, useState } from 'react';
import '../styles/dashboard.css';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  image: string;
  suspended?: boolean;
}

const specialties = [
  "Cardiologist", "Dermatologist", "Pediatrician", "Neurologist",
  "Orthopedic", "Oncologist", "Psychiatrist", "Ophthalmologist",
  "Dentist", "Gynecologist", "Surgeon", "General Practitioner"
];

const Dashboard = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      const querySnapshot = await getDocs(collection(db, 'doctors'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Doctor));
      setDoctors(data);
    };
    fetchDoctors();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'doctors', id));
    setDoctors(prev => prev.filter(doc => doc.id !== id));
    setSelectedDoctor(null);
  };

  const handleSuspend = async (doctor: Doctor) => {
    const updated = { ...doctor, suspended: !doctor.suspended };
    await updateDoc(doc(db, 'doctors', doctor.id), { suspended: updated.suspended });
    setDoctors(prev => prev.map(d => d.id === doctor.id ? updated : d));
    setSelectedDoctor(updated);
  };

  const filteredDoctors = doctors.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedSpecialty === '' || d.specialty === selectedSpecialty)
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select value={selectedSpecialty} onChange={e => setSelectedSpecialty(e.target.value)}>
          <option value="">All Specialties</option>
          {specialties.map(spec => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>
      </div>

      <div className="dashboard-content">
        <div className="doctor-list">
          {filteredDoctors.map(doctor => (
            <div
              key={doctor.id}
              className={`doctor-card ${doctor.suspended ? 'suspended' : ''}`}
              onClick={() => setSelectedDoctor(doctor)}
            >
              <h3>{doctor.name}</h3>
              <p>{doctor.specialty}</p>
            </div>
          ))}
        </div>

        {selectedDoctor && (
          <div className="doctor-detail">
            <img src={selectedDoctor.image} alt={selectedDoctor.name} />
            <h2>{selectedDoctor.name}</h2>
            <p><strong>Specialty:</strong> {selectedDoctor.specialty}</p>
            <p><strong>Bio:</strong> {selectedDoctor.bio}</p>
            <p><strong>Address:</strong> {selectedDoctor.location.address}</p>
            <div className="map-container">
              <iframe
                title="doctor-location-map"
                width="100%"
                height="200"
                loading="lazy"
                style={{ border: 0, borderRadius: '6px' }}
                src={`https://maps.google.com/maps?q=${selectedDoctor.location.latitude},${selectedDoctor.location.longitude}&z=15&output=embed`}
              />
            </div>
            <div className="card-buttons">
              <button onClick={() => handleSuspend(selectedDoctor)}>
                {selectedDoctor.suspended ? "Activate" : "Suspend"}
              </button>
              <button onClick={() => handleDelete(selectedDoctor.id)}>Remove</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
