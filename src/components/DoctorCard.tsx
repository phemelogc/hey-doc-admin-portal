import React from 'react';

interface DoctorCardProps {
  name: string;
  specialty: string;
  onSuspend: () => void;
  onRemove: () => void;
  onClick: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ name, specialty, onSuspend, onRemove, onClick }) => (
  <div onClick={onClick} className="doctor-card">
    <h3>{name}</h3>
    <p>{specialty}</p>
    <div className="card-buttons">
      <button onClick={onSuspend}>Suspend</button>
      <button onClick={onRemove}>Remove</button>
    </div>
  </div>
);

export default DoctorCard;
