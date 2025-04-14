import React from 'react';
import styles from '../app/page.module.css';
import { SimilarQuestions } from './SimilarQuestions';

export function MobileSidebar({ isOpen, onClose, similarResults, onQuestionClick }) {
  return (
    <>
      <div 
        className={`${styles.backdrop} ${isOpen ? styles.backdropVisible : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div className={`${styles.mobileSidebar} ${isOpen ? styles.mobileSidebarOpen : ''}`}>
        <div className={styles.mobileSidebarHeader}>
          <div className={styles.mobileSidebarTitle}>Similar Questions</div>
          <button 
            className={styles.closeButton} 
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className={styles.mobileSidebarContent}>
          <SimilarQuestions 
            results={similarResults}
            onQuestionClick={(question) => {
              onQuestionClick(question);
              onClose();
            }}
          />
        </div>
      </div>
    </>
  );
}