import React from 'react';
import styles from './StatusIndicator.module.css';

export function StatusIndicator({ status, error }) {
  if (error) {
    return (
      <div className={styles.container}>
        <div className={`${styles.indicator} ${styles.offline}`}></div>
        <span>Offline</span>
      </div>
    );
  }
  
  if (!status || Object.keys(status).length === 0) {
    return (
      <div className={styles.container}>
        <div className={`${styles.indicator} ${styles.connecting}`}></div>
        <span>Connecting...</span>
      </div>
    );
  }

  const isFullyConfigured = 
    status.gemini_available && 
    (status.pinecone_available || (!status.pinecone_api_key_configured));

  return (
    <div className={styles.container}>
      <div className={`${styles.indicator} ${isFullyConfigured ? styles.online : styles.partial}`}></div>
      <span>{isFullyConfigured ? 'Online' : 'Partial Service'}</span>
      
      {!isFullyConfigured && (
        <div className={styles.statusDetails}>
          <p>Service Status:</p>
          <ul>
            <li>
              AI Service: {status.gemini_available ? '✅' : '❌'}
            </li>
            <li>
              Vector DB: {status.pinecone_available ? '✅' : '❌'}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}