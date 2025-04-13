// import React from 'react';
// import styles from './ChatMessage.module.css';

// export function ChatMessage({ message }) {
//   const isUser = message.role === 'user';
  
//   return (
//     <div className={`${styles.messageContainer} ${isUser ? styles.userMessage : styles.assistantMessage}`}>
//       <div className={styles.avatar}>
//         {isUser ? '👤' : '🤖'}
//       </div>
//       <div className={styles.messageContent}>
//         <div className={styles.messageText}>{message.content}</div>
//       </div>
//     </div>
//   );
// }



// File: src/components/ChatMessage.js
import React from 'react';
import styles from './ChatMessage.module.css';

export function ChatMessage({ message, isLast }) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`${styles.messageContainer} ${isUser ? styles.userMessage : styles.assistantMessage} ${isLast ? styles.lastMessage : ''}`}>
      <div className={styles.avatarContainer}>
        {isUser ? (
          <div className={styles.userAvatar}>
            <span>YO</span>
          </div>
        ) : (
          <div className={styles.assistantAvatar}>
            <span>SB</span>
          </div>
        )}
      </div>
      <div className={styles.messageContent}>
        <div className={styles.messageHeader}>
          <span className={styles.messageSender}>
            {isUser ? 'You' : 'Startup Buddy'}
          </span>
          <span className={styles.messageTime}>
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <div className={styles.messageText}>
          {message.content}
        </div>
      </div>
    </div>
  );
}