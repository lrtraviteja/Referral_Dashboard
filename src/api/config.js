const metaEnv = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_API_BASE_URL : undefined;
const processEnv = typeof process !== 'undefined' && process.env ? process.env.VITE_API_BASE_URL : undefined;

export const API_BASE_URL = metaEnv || processEnv || 'https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api';
