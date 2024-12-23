const API_URL = 'https://petadoption.schoolwork.dk/api';

const apiFacade = {
  // Function to set the token in localStorage
  setToken: (token) => {
    localStorage.setItem('jwtToken', token);
  },

  // Function to get the token from localStorage
  getToken: () => {
    return localStorage.getItem('jwtToken');
  },

  // Function to check if a user is logged in
  loggedIn: () => {
    return !!apiFacade.getToken(); // Returns true if token exists
  },

  // Function to handle user logout
  logout: (callback) => {
    localStorage.removeItem('jwtToken');
    callback(false); // Update logged-in state
  },

  // Function to create options for API calls
  makeOptions: (method, payload = null, addToken = false) => {
    const opts = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    if (addToken && apiFacade.loggedIn()) {
      opts.headers['Authorization'] = `Bearer ${apiFacade.getToken()}`;
    }

    if (payload) {
      opts.body = JSON.stringify(payload);
    }

    return opts;
  },

  // Function to handle login
  login: async (username, password, callback) => {
    try {
      const payload = { username, password };
      const options = apiFacade.makeOptions('POST', payload);

      const response = await fetch(`${API_URL}/auth/login`, options);
      if (!response.ok) {
        throw new Error('Failed to log in');
      }

      const json = await response.json();
      if (json.token) {
        apiFacade.setToken(json.token); // Store token
        callback(true); // Set logged-in state
      } else {
        throw new Error('No token received from server');
      }
    } catch (error) {
      console.error('Login Error:', error);
      callback(false);
      throw error;
    }
  },

  // Function to make authenticated API calls
  fetchData: async (endpoint, method = 'GET', payload = null) => {
    const options = apiFacade.makeOptions(method, payload, true); // Add token
    try {
      const response = await fetch(`${API_URL}${endpoint}`, options);
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${endpoint}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Function to fetch the list of dogs
  fetchDogs: async () => {
    try {
      return await apiFacade.fetchData('/dogs/', 'GET');
    } catch (error) {
      console.error('Fetch Dogs Error:', error);
      throw error;
    }
  },

  // Function to fetch dog details by ID
  fetchDogDetails: async (id) => {
    try {
      return await apiFacade.fetchData(`/dogs/${id}`, 'GET');
    } catch (error) {
      console.error('Fetch Dog Details Error:', error);
      throw error;
    }
  },

  // Function to get user roles from the token
  getUserRoles: () => {
    const token = apiFacade.getToken();
    if (token) {
      const payloadBase64 = token.split('.')[1];
      const decodedClaims = JSON.parse(window.atob(payloadBase64));
      return decodedClaims.roles || '';
    } else {
      return '';
    }
  },

  // Function to check if a user has a specific role
  hasUserAccess: (neededRole, loggedIn) => {
    const roles = apiFacade.getUserRoles().split(',');
    return loggedIn && roles.includes(neededRole);
  },

  // Function to create a dog
  createDog: async (dogData) => {
    try {
      console.log('Sending request to create dog with data:', dogData);  // Log the data being sent

      const options = apiFacade.makeOptions('POST', dogData, true); // Ensure token is sent with request
      const response = await fetch(`${API_URL}/dogs`, options); // Correct endpoint

      // Log the raw response for debugging
      console.log('Response received from backend:', response);

      if (!response.ok) {
        const errorResponse = await response.json(); // Log the response body for error details
        console.error('Error response from backend:', errorResponse);
        throw new Error('Failed to create dog');
      }

      const data = await response.json();
      console.log('Successfully created dog:', data);
      return data; // Return the response (created dog data or success message)
    } catch (error) {
      console.error('Error in creating dog:', error);
      throw error; // Propagate error
    }
  },

  // Function to fetch user adoption status
  fetchUserAdoptionStatus: async (userId) => {
    try {
      const response = await fetch(`${API_URL}/adoption/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiFacade.getToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user adoption status');
      }

      return await response.json();
    } catch (err) {
      console.error('Error in fetchUserAdoptionStatus:', err);
      throw err;
    }
  },

  // Function to fetch all adoptions
  fetchAdoptions: async () => {
    try {
      const response = await fetch(`${API_URL}/adoption`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiFacade.getToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch adoptions');
      }

      return await response.json();
    } catch (err) {
      console.error('Error in fetchAdoptions:', err);
      throw err;
    }
  },

  // Function to create a new adoption
  createAdoption: async (adoptionData) => {
    try {
      console.log("Creating adoption with data:", adoptionData); // Log the data being sent
      const options = apiFacade.makeOptions('POST', adoptionData, true); // Ensure token is included
      const response = await fetch(`${API_URL}/adoption/`, options); // Correct endpoint
  
      console.log('Response Status:', response.status);  // Log the response status
      console.log('Response Headers:', response.headers);  // Log the response headers
  
      if (!response.ok) {
        const errorResponse = await response.json(); // Attempt to parse error response from backend
        console.error('Error response from backend:', errorResponse);
        throw new Error(`Failed to create adoption: ${errorResponse.message || 'Unknown error'}`);
      }
  
      const data = await response.json();
      console.log('Successfully created adoption:', data);
      return data; // Return the response (created adoption data or success message)
    } catch (error) {
      console.error('Create Adoption Error:', error);
      throw error; // Propagate error
    }
  },
  
  
};

export default apiFacade;