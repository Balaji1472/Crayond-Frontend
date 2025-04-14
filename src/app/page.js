
// // File: src/app/page.js
// 'use client'

// import { useState, useEffect, useRef } from 'react'
// import styles from './page.module.css'
// import { ChatMessage } from '@/components/ChatMessage'
// import { SimilarQuestions } from '@/components/SimilarQuestions'
// import { StatusIndicator } from '@/components/StatusIndicator'
// import { API_BASE_URL, fetchApi } from '@/config/api'

// export default function Home() {
//   const [input, setInput] = useState('')
//   const [messages, setMessages] = useState([])
//   const [sessionId, setSessionId] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [apiStatus, setApiStatus] = useState({})
//   const [similarResults, setSimilarResults] = useState([])
//   const [connectionError, setConnectionError] = useState(null)
//   const messagesEndRef = useRef(null)

//   // Fetch API status on component mount
//   useEffect(() => {
//     const checkApiStatus = async () => {
//       try {
//         setConnectionError(null);
//         console.log('Checking API status');
        
//         const response = await fetchApi('/api/status');
//         if (!response.ok) {
//           throw new Error(`Server responded with status: ${response.status}`);
//         }
        
//         const data = await response.json();
//         setApiStatus(data);
//         console.log('API Status:', data);
//       } catch (error) {
//         console.error('Error fetching API status:', error);
//         setConnectionError(`Failed to connect to API: ${error.message}`);
//       }
//     };
    
//     checkApiStatus();
    
//     // Set up periodic checking
//     const intervalId = setInterval(checkApiStatus, 30000);
//     return () => clearInterval(intervalId);
//   }, []);

//   // Scroll to bottom whenever messages update
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
    
//     if (!input.trim()) return;
    
//     // Add user message to chat
//     const userMessage = { role: 'user', content: input };
//     setMessages((prev) => [...prev, userMessage]);
    
//     // Store current input before clearing
//     const currentInput = input;
//     setInput('');
    
//     // Show loading state
//     setLoading(true);
//     setConnectionError(null);
    
//     try {
//       console.log('Sending chat request to API');
//       const response = await fetchApi('/api/chat', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           question: currentInput,
//           session_id: sessionId || undefined,
//         }),
//       });
      
//       if (!response.ok) {
//         throw new Error(`Server responded with status: ${response.status}`);
//       }
      
//       const data = await response.json();
//       console.log('Received response:', data);
      
//       // Save session ID if this is the first message
//       if (!sessionId) {
//         setSessionId(data.session_id);
//       }
      
//       // Add bot response to chat
//       setMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
      
//       // Update similar questions
//       if (data.similar_results && data.similar_results.length > 0) {
//         setSimilarResults(data.similar_results);
//       }
      
//     } catch (error) {
//       console.error('Error sending message:', error);
//       setConnectionError(`Failed to send message: ${error.message}`);
//       setMessages((prev) => [...prev, { 
//         role: 'assistant', 
//         content: 'Sorry, I encountered an error connecting to the backend. Please check that the API server is running.' 
//       }]);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const handleSimilarQuestionClick = (question) => {
//     setInput(question);
//   };

//   return (
//     <main className={styles.main}>
//       <div className={styles.container}>
//         <header className={styles.header}>
//           <h1>Startup Buddy</h1>
//           <StatusIndicator status={apiStatus} error={connectionError} />
//         </header>
        
//         {connectionError && (
//           <div className={styles.errorBanner}>
//             <p>⚠️ Connection error: {connectionError}</p>
//             <p className={styles.errorTip}>
//               Make sure your backend server is running at {API_BASE_URL}.
//             </p>
//           </div>
//         )}
        
//         <div className={styles.chatContainer}>
//           <div className={styles.messageList}>
//             {messages.length === 0 ? (
//               <div className={styles.welcome}>
//                 <h2>Welcome to Startup Buddy!</h2>
//                 <p>Ask me anything about starting or growing your business.</p>
//               </div>
//             ) : (
//               messages.map((message, index) => (
//                 <ChatMessage 
//                   key={index} 
//                   message={message} 
//                 />
//               ))
//             )}
//             {loading && (
//               <div className={styles.loading}>
//                 <div className={styles.loadingDot}></div>
//                 <div className={styles.loadingDot}></div>
//                 <div className={styles.loadingDot}></div>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>
          
//           {similarResults.length > 0 && (
//             <SimilarQuestions 
//               results={similarResults} 
//               onQuestionClick={handleSimilarQuestionClick} 
//             />
//           )}
//         </div>
        
//         <form className={styles.inputForm} onSubmit={handleSendMessage}>
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Ask a question..."
//             className={styles.input}
//             disabled={loading}
//           />
//           <button 
//             type="submit" 
//             className={styles.sendButton}
//             disabled={loading || !input.trim()}
//           >
//             Send
//           </button>
//         </form>
//       </div>
//     </main>
//   );
// }


// File: src/app/page.js
'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './page.module.css'
import { ChatMessage } from '@/components/ChatMessage'
import { SimilarQuestions } from '@/components/SimilarQuestions'
import { StatusIndicator } from '@/components/StatusIndicator'
import { MobileNavbar } from '@/components/MobileNavbar'
import { MobileSidebar } from '@/components/MobileSidebar'
import { API_BASE_URL, fetchApi } from '@/config/api'

export default function Home() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [sessionId, setSessionId] = useState('')
  const [loading, setLoading] = useState(false)
  const [apiStatus, setApiStatus] = useState({})
  const [similarResults, setSimilarResults] = useState([])
  const [connectionError, setConnectionError] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const messagesEndRef = useRef(null)

  // Fetch API status on component mount
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        setConnectionError(null);
        console.log('Checking API status');
        
        const response = await fetchApi('/api/status');
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        setApiStatus(data);
        console.log('API Status:', data);
      } catch (error) {
        console.error('Error fetching API status:', error);
        setConnectionError(`Failed to connect to API: ${error.message}`);
      }
    };
    
    checkApiStatus();
    
    // Set up periodic checking
    const intervalId = setInterval(checkApiStatus, 30000);
    return () => clearInterval(intervalId);
  }, []);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    
    // Store current input before clearing
    const currentInput = input;
    setInput('');
    
    // Show loading state
    setLoading(true);
    setConnectionError(null);
    
    try {
      console.log('Sending chat request to API');
      const response = await fetchApi('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: currentInput,
          session_id: sessionId || undefined,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Received response:', data);
      
      // Save session ID if this is the first message
      if (!sessionId) {
        setSessionId(data.session_id);
      }
      
      // Add bot response to chat
      setMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
      
      // Update similar questions
      if (data.similar_results && data.similar_results.length > 0) {
        setSimilarResults(data.similar_results);
      }
      
    } catch (error) {
      console.error('Error sending message:', error);
      setConnectionError(`Failed to send message: ${error.message}`);
      setMessages((prev) => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error connecting to the backend. Please check that the API server is running.' 
      }]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSimilarQuestionClick = (question) => {
    setInput(question);
  };
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Startup Buddy</h1>
          <StatusIndicator status={apiStatus} error={connectionError} />
        </header>
        
        {connectionError && (
          <div className={styles.errorBanner}>
            <p>⚠️ Connection error: {connectionError}</p>
            <p className={styles.errorTip}>
              Make sure your backend server is running at {API_BASE_URL}.
            </p>
          </div>
        )}
        
        {/* Mobile navbar */}
        <MobileNavbar toggleSidebar={toggleSidebar} />
        
        <div className={styles.chatContainer}>
          <div className={styles.messageList}>
            {messages.length === 0 ? (
              <div className={styles.welcome}>
                <h2>Welcome to Startup Buddy!</h2>
                <p>Ask me anything about starting or growing your business.</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <ChatMessage 
                  key={index} 
                  message={message} 
                />
              ))
            )}
            {loading && (
              <div className={styles.loading}>
                <div className={styles.loadingDot}></div>
                <div className={styles.loadingDot}></div>
                <div className={styles.loadingDot}></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {similarResults.length > 0 && (
            <SimilarQuestions 
              results={similarResults} 
              onQuestionClick={handleSimilarQuestionClick} 
            />
          )}
        </div>
        
        <form className={styles.inputForm} onSubmit={handleSendMessage}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className={styles.input}
            disabled={loading}
          />
          <button 
            type="submit" 
            className={styles.sendButton}
            disabled={loading || !input.trim()}
          >
            Send
          </button>
        </form>
      </div>
      
      {/* Mobile sidebar */}
      <MobileSidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        similarResults={similarResults}
        onQuestionClick={handleSimilarQuestionClick}
      />
    </main>
  );
}