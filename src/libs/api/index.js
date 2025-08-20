function createApiClient(config) {
  const { baseUrl, defaultHeaders = {} } = config;

  const request = async (endpoint, options = {}) => {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      });

      return [null, response];
    } catch (error) {
      console.error(`API request to ${endpoint} failed:`, error);
      return [error, null];
    }
  }

  return {
    request
  };
}

export {
  createApiClient
}