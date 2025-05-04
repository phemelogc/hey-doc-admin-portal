import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import '../styles/analytics.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const specialties = [
  "Cardiologist", "Dermatologist", "Pediatrician", "Neurologist",
  "Orthopedic", "Oncologist", "Psychiatrist", "Ophthalmologist",
  "Dentist", "Gynecologist", "Surgeon", "General Practitioner"
];

// Assign a unique color to each specialty
const specialtyColors = [
  '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
  '#9966FF', '#FF9F40', '#00A6B4', '#B4FF00',
  '#C9CBCF', '#F67019', '#8E5EA2', '#3CBA9F'
];

const Analytics = () => {
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [suspendedDoctors, setSuspendedDoctors] = useState(0);
  const [specialtyCounts, setSpecialtyCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchData = async () => {
      const doctorsSnapshot = await getDocs(collection(db, 'doctors'));
      setTotalDoctors(doctorsSnapshot.size);

      const suspendedQuery = query(collection(db, 'doctors'), where('suspended', '==', true));
      const suspendedSnapshot = await getDocs(suspendedQuery);
      setSuspendedDoctors(suspendedSnapshot.size);

      const counts: Record<string, number> = {};
      specialties.forEach(s => (counts[s] = 0));

      doctorsSnapshot.forEach(doc => {
        const data = doc.data();
        const specialty = data.specialty;
        if (specialty && Object.prototype.hasOwnProperty.call(counts, specialty)) {
          counts[specialty]++;
        }
      });

      setSpecialtyCounts(counts);
    };

    fetchData();
  }, []);

  const labels = ['Total Doctors', 'Suspended Doctors', ...specialties];
  const dataValues = [
    totalDoctors,
    suspendedDoctors,
    ...specialties.map(spec => specialtyCounts[spec] || 0)
  ];

  const barColors = ['yellow', 'orange', ...specialtyColors];

  const data = {
    labels,
    datasets: [
      {
        label: 'Count',
        data: dataValues,
        backgroundColor: barColors,
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'yellow',
        },
      },
      title: {
        display: true,
        text: 'Doctor Statistics by Specialty',
        color: 'yellow',
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'yellow',
        },
      },
      y: {
        ticks: {
          color: 'yellow',
        },
      },
    },
  };

  return (
    <div className="analytics-container">
      <Bar data={data} options={options} />
    </div>
  );
};

export default Analytics;
