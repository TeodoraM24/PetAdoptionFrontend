const API_URL = 'http://localhost:7070/api';

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
};

export default apiFacade;
