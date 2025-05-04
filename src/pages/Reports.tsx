import React, { useEffect, useState } from 'react';
import '../styles/reports.css';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import jsPDF from 'jspdf';

interface Doctor {
  id: string;
  docId: string;
  image: string;
  name: string;
  age: string;
  specialty: string;
  bio: string;
  email: string;
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };
}

const Reports: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      const snapshot = await getDocs(collection(db, 'doctors'));
      const doctorList: Doctor[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Doctor[];
      setDoctors(doctorList);
    };

    fetchDoctors();
  }, []);

  const handleGeneratePDF = () => {
    if (!selectedDoctor) return;

    const doc = new jsPDF();

    // === 👉 PASTE YOUR CLINIC LOGO URL OR BASE64 HERE ===
    const logoUrl = 'https://res.cloudinary.com/dkrlubugm/image/upload/v1746367219/icon_ffjhh1.png'; // <-- Replace this

    doc.addImage(logoUrl, 'PNG', 150, 10, 40, 20); 

    doc.setFontSize(16);
    doc.text(`Doctor Report: Dr. ${selectedDoctor.name}`, 20, 40); 

    doc.setFontSize(12);
    doc.text(`Doctor ID: ${selectedDoctor.docId}`, 20, 60);
    doc.text(`Name: ${selectedDoctor.name}`, 20, 70);
    doc.text(`Age: ${selectedDoctor.age}`, 20, 80);
    doc.text(`Email: ${selectedDoctor.email}`, 20, 90);
    doc.text(`Specialty: ${selectedDoctor.specialty}`, 20, 100);
    doc.text(`Bio: ${selectedDoctor.bio}`, 20, 110);
    doc.text(`Location: ${selectedDoctor.location.name}`, 20, 120);

    doc.save(`Dr_${selectedDoctor.name.replace(/\s+/g, '_')}_Report.pdf`);
  };

  return (
    <div className="reports-container">
      <h2>Doctor Reports</h2>
      <div className="reports-content">
        <div className="doctor-list">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className={`doctor-item ${selectedDoctor?.id === doc.id ? 'selected' : ''}`}
              onClick={() => setSelectedDoctor(doc)}
            >
              {doc.name}
            </div>
          ))}
        </div>
        <div className="doctor-detail">
          {selectedDoctor ? (
            <>
              <img src={selectedDoctor.image} alt="Doctor" />
              <h3>{selectedDoctor.name}</h3>
              <p><strong>Doctor ID:</strong> {selectedDoctor.docId}</p>
              <p><strong>Age:</strong> {selectedDoctor.age}</p>
              <p><strong>Email:</strong> {selectedDoctor.email}</p>
              <p><strong>Specialty:</strong> {selectedDoctor.specialty}</p>
              <p><strong>Bio:</strong> {selectedDoctor.bio}</p>
              <p><strong>Location:</strong> {selectedDoctor.location.name}</p>

              <iframe
                title="doctor-map"
                width="100%"
                height="200"
                loading="lazy"
                style={{ border: 0, borderRadius: '6px', marginTop: '1rem' }}
                src={`https://maps.google.com/maps?q=${selectedDoctor.location.latitude},${selectedDoctor.location.longitude}&z=15&output=embed`}
              />

              <button onClick={handleGeneratePDF}>Generate Report</button>
            </>
          ) : (
            <p>Select a doctor to view details and generate a report.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
