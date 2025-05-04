import React from 'react';

interface DoctorDetailProps {
  doctor: {
    image: string;
    name: string;
    bio: string;
    specialty: string;
    location: {
      address: string;
      latitude: number;
      longitude: number;
    };
  };
}

const DoctorDetail: React.FC<DoctorDetailProps> = ({ doctor }) => (
  <div className="doctor-detail">
    <img src={doctor.image} alt="Doctor" />
    <h2>{doctor.name}</h2>
    <p><strong>Specialty:</strong> {doctor.specialty}</p>
    <p><strong>Location:</strong> {doctor.location.address}</p>
    <p>{doctor.bio}</p>
    <iframe
      title="doctor-map"
      width="100%"
      height="200"
      loading="lazy"
      style={{ border: 0, borderRadius: '6px', marginTop: '1rem' }}
      src={`https://maps.google.com/maps?q=${doctor.location.latitude},${doctor.location.longitude}&z=15&output=embed`}
    />
  </div>
);

export default DoctorDetail;
