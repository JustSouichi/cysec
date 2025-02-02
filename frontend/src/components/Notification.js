// frontend/src/components/Notification.js
import React, { useEffect } from 'react';

const Notification = ({ message, type, onClose, duration = 3000 }) => {
  // "type" può essere 'success', 'error' o 'info'
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  let bgColor = 'bg-info';
  if (type === 'success') bgColor = 'bg-success';
  else if (type === 'error') bgColor = 'bg-danger';

  return (
    <div
      className={`toast show ${bgColor} text-white`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        minWidth: '250px'
      }}
    >
      <div className="toast-body">{message}</div>
    </div>
  );
};

export default Notification;
