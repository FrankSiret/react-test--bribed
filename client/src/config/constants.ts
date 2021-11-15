const config = {
    VERSION: process.env.VERSION,
};

export default config;

export const DEVELOPMENT = process.env.NODE_ENV || "development";
export const SERVER_API_URL = process.env.SERVER_API_URL || "http://localhost:5000/";

export const ENTITY_ROUTE = {
    BRIBED: '/bribed'
}