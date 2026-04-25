import React from 'react';
import './DiagnosisView.css';
import diagnosisPageOne from '../../assets/Diagnosis/diagnosis-1.png';
import diagnosisPageTwo from '../../assets/Diagnosis/diagnosis-2.png';

export const diagnosisPages = [
  {
    image: diagnosisPageOne,
    label: 'Diagnosis page 1',
  },
  {
    image: diagnosisPageTwo,
    label: 'Diagnosis page 2',
  },
];

function DiagnosisView({ page = 1, pages = diagnosisPages }) {
  const currentPage = pages[Math.max(0, Math.min(page - 1, pages.length - 1))];

  return (
    <div className="diagnosis-view" aria-label={currentPage.label}>
      <img className="diagnosis-background" src={currentPage.image} alt="" />
    </div>
  );
}

export default DiagnosisView;
