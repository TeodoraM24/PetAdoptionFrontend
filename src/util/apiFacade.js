const API_URL = 'http://localhost:7070/api';

const apiFacade = {
  fetchDogs: async () => {
    try {
      const response = await fetch(`${API_URL}/dogs/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dogs');
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // New method to fetch dog details by ID
  fetchDogDetails: async (id) => {
    try {
      const response = await fetch(`${API_URL}/dogs/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dog details');
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
};

export default apiFacade;
