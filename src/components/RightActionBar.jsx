import React from 'react';
import './RightActionBar.css';

function RightActionBar({ avatar = '💪', likes = '364.8K', comments = '3257', bookmarks = '46.3K', shares = '9181' }) {
  return (
    <div className="right-action-bar">
      <div className="action-item profile">
        <div className="avatar-wrapper">
          <div className="avatar">{avatar}</div>
          <div className="follow-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path fill="white" d="M11.5 12.5H6v-1h5.5V6h1v5.5H18v1h-5.5V18h-1z"/></svg>
          </div>
        </div>
      </div>
      
      <div className="action-item">
        <button className="icon-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="m12 19.654l-.758-.685q-2.448-2.236-4.05-3.829q-1.601-1.593-2.528-2.81t-1.296-2.2T3 8.15q0-1.908 1.296-3.204T7.5 3.65q1.32 0 2.475.675T12 6.289Q12.87 5 14.025 4.325T16.5 3.65q1.908 0 3.204 1.296T21 8.15q0 .996-.368 1.98q-.369 .986-1.296 2.202t-2.519 2.809q-1.592 1.592-4.06 3.828z"/></svg>
        </button>
        <span className="action-text">{likes}</span>
      </div>
      
      <div className="action-item">
        <button className="icon-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M4.616 17q-.691 0-1.153-.462T3 15.385V4.615q0-.69.463-1.153T4.615 3h14.77q.69 0 1.152.462T21 4.615v15.462L17.923 17z"/></svg>
        </button>
        <span className="action-text">{comments}</span>
      </div>
      
      <div className="action-item">
        <button className="icon-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19.5V5.616q0-.691.463-1.153T7.616 4h8.769q.69 0 1.153.463T18 5.616V19.5l-6-2.577z"/></svg>
        </button>
        <span className="action-text">{bookmarks}</span>
      </div>
      
      <div className="action-item">
        <button className="icon-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M16.61 21q-.994 0-1.687-.695q-.692-.696-.692-1.69q0-.15.132-.757l-7.197-4.273q-.324.374-.793.587t-1.007.213q-.986 0-1.676-.702T3 12t.69-1.683t1.676-.702q.537 0 1.007.213t.793.588l7.198-4.255q-.07-.194-.101-.385q-.032-.192-.032-.392q0-.993.697-1.689Q15.625 3 16.62 3t1.688.697T19 5.389t-.695 1.688t-1.69.692q-.542 0-1-.222t-.78-.597l-7.199 4.273q.07.194.101.386q.032.191.032.391t-.032.391t-.1.386l7.198 4.273q.323-.375.78-.597q.458-.222 1-.222q.994 0 1.69.696q.695.698.695 1.693t-.697 1.688t-1.692.692"/></svg>
        </button>
        <span className="action-text">{shares}</span>
      </div>

      <div className="action-item music-record">
        <div className="record-spin">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="white" d="M12 21q-3.45 0-6.012-2.288T3.127 13h1.011q.3 2.925 2.506 4.963T12 20t5.356-2.037t2.506-4.963h1.01q-.3 3.45-2.862 5.738T12 21m-1-5.173q-1.385-.211-2.317-1.222T7.75 12.15q0-1.538 1.081-2.619T11.45 8.45q1.538 0 2.619 1.081T15.15 12.15q0 .173-.02.346t-.057.346l1.246 3.193q.038.1.005.195t-.12.155t-.195.033t-.155-.12z"/></svg>
        </div>
      </div>
    </div>
  );
}

export default RightActionBar;
