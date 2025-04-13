import React from 'react';
import styles from './ChatMessage.module.css';

export function ChatMessage({ message }) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`${styles.messageContainer} ${isUser ? styles.userMessage : styles.assistantMessage}`}>
      <div className={styles.avatar}>
        {isUser ? '👤' : '🤖'}
      </div>
      <div className={styles.messageContent}>
        <div className={styles.messageText}>{message.content}</div>
      </div>
    </div>
  );
}