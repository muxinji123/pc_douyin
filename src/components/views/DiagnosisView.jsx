import React from 'react';
import './DiagnosisView.css';
import OrderCard from './OrderCard';
import EquipmentCard from './EquipmentCard';
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
  const [showOrder, setShowOrder] = React.useState(false);
  const [showEquipment, setShowEquipment] = React.useState(false);
  const currentPage = pages[Math.max(0, Math.min(page - 1, pages.length - 1))];

  // 只有在 diagnosis-2 (第二页) 才显示拼单点击区域
  const isDiagnosisSecondPage = currentPage.label === 'Diagnosis page 2';
  
  // 只有在 injury-1 (损伤页面第一页) 才显示装备点击区域
  const isInjuryFirstPage = currentPage.label === 'Injury page 1';
  
  // 只有在 alimentary-1 (营养页面第一页) 才显示点击区域
  const isAlimentaryFirstPage = currentPage.label === 'Alimentary page 1';

  return (
    <div className="diagnosis-view" aria-label={currentPage.label}>
      <img className="diagnosis-background" src={currentPage.image} alt="" />
      
      {isDiagnosisSecondPage && !showOrder && (
        <div className="hitboxes-layer">
          <div className="order-hitbox coach-1" onClick={() => setShowOrder(true)} />
          <div className="order-hitbox coach-2" onClick={() => setShowOrder(true)} />
          <div className="order-hitbox coach-3" onClick={() => setShowOrder(true)} />
        </div>
      )}

      {isInjuryFirstPage && !showEquipment && (
        <div className="hitboxes-layer">
          <div className="equip-hitbox item-a" onClick={() => setShowEquipment(true)} />
          <div className="equip-hitbox item-b" onClick={() => setShowEquipment(true)} />
          <div className="equip-hitbox item-c" onClick={() => setShowEquipment(true)} />
        </div>
      )}

      {isAlimentaryFirstPage && !showEquipment && (
        <div className="hitboxes-layer">
          {/* 补剂 1: 蛋白粉 */}
          <div className="alimentary-hitbox food-a" onClick={() => setShowEquipment(true)} />
          {/* 补剂 2: 肌酸 */}
          <div className="alimentary-hitbox food-b" onClick={() => setShowEquipment(true)} />
        </div>
      )}

      {showOrder && (
        <OrderCard onBack={() => setShowOrder(false)} />
      )}

      {showEquipment && (
        <EquipmentCard onBack={() => setShowEquipment(false)} />
      )}
    </div>
  );
}

export default DiagnosisView;
