const API_URL = process.env.API_URL || 'http://localhost:3000';
const JWT_TOKEN = process.env.JWT_TOKEN || 'sssh-it-is-a-secret-token';
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '';

module.exports = {
	API_URL,
	JWT_TOKEN,
	SENDGRID_API_KEY,
};
