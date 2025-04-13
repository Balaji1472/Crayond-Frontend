import React from 'react';
import styles from './SimilarQuestions.module.css';

export function SimilarQuestions({ results, onQuestionClick }) {
  if (!results || results.length === 0) return null;
  
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Similar Questions</h3>
      <ul className={styles.list}>
        {results.map((result, index) => (
          <li key={index} className={styles.item}>
            <button 
              className={styles.questionButton}
              onClick={() => onQuestionClick(result.question)}
            >
              {result.question}
            </button>
            <div className={styles.score}>
              {(result.score * 100).toFixed(0)}% match
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}