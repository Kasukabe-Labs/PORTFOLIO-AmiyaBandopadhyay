import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

console.log('Attempting to connect to MongoDB URI:', MONGODB_URI);

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
    console.log('Initializing new MongoDB connection cache');
}

async function connectDB() {
    if (cached.conn) {
        console.log('Using existing MongoDB connection');
        return cached.conn;
    }

    if (!cached.promise) {
        console.log('Creating new MongoDB connection...');
        cached.promise = mongoose.connect(MONGODB_URI!).then((mongoose) => {
            console.log('Successfully connected to MongoDB!');
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
        console.log('MongoDB connection established successfully');
    } catch (e) {
        cached.promise = null;
        console.error('MongoDB connection error:', e);
        throw e;
    }

    return cached.conn;
}

export default connectDB;
