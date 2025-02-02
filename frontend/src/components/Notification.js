import React, { useEffect } from 'react';

const Notification = ({ message, type, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  let bgColor = 'bg-info';
  if (type === 'success') bgColor = 'bg-success';
  else if (type === 'error') bgColor = 'bg-danger';

  return (
    <div className={`toast toast-custom show ${bgColor} text-white`}>
      <div className="toast-body">{message}</div>
    </div>
  );
};

export default Notification;
