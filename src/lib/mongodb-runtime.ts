// Ce fichier est maintenant un alias vers mongodb.ts pour la compatibilité
// Toutes les connexions sont centralisées dans mongodb.ts

export { default, connectDB, connectToDatabase, disconnectDB } from './mongodb';

// Note: Ce fichier redirige vers mongodb.ts pour éviter les connexions multiples
// et résoudre le problème de dépassement de limite de connexions MongoDB Atlas