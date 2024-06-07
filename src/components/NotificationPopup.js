import React, { useState, useEffect } from 'react';
import styles from './NotificationPopup.module.css';

const NotificationPopup = ({ message, onClose }) => {
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${styles.popup} ${showPopup ? styles.show : styles.hide}`}>
      <div className={styles.message}>{message}</div>
    </div>
  );
};

export default NotificationPopup;