// File: src/config/api.js
export const API_BASE_URL = 'http://localhost:8000';

// Simple fetch wrapper with better error handling
export async function fetchApi(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log(`Fetching: ${url}`);
  
  try {
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    console.error(`API call failed: ${error.message}`);
    throw error;
  }
}