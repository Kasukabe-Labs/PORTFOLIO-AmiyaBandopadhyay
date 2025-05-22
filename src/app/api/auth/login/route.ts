import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import Admin from '@/models/Admin';
import connectDB from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: Request) {
    try {
        console.log('Login attempt started');
        await connectDB();

        const { username, password } = await req.json();
        console.log('Login attempt for username:', username);

        // Check if this is the first login attempt and create admin if it doesn't exist
        const adminExists = await Admin.findOne({ username: 'amiyalic' });
        console.log('Default admin exists:', !!adminExists);
        
        if (!adminExists) {
            console.log('Creating default admin account...');
            await Admin.create({
                username: 'amiyalic',
                password: 'Admin123'
            });
            console.log('Default admin account created successfully');
        }

        const admin = await Admin.findOne({ username });
        console.log('Found admin account:', !!admin);

        if (!admin) {
            console.log('Login failed: Admin not found');
            return NextResponse.json(
                { message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        const isPasswordValid = await admin.comparePassword(password);
        console.log('Password validation result:', isPasswordValid);

        if (!isPasswordValid) {
            console.log('Login failed: Invalid password');
            return NextResponse.json(
                { message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        console.log('Login successful, creating JWT token...');
        // Create JWT token
        const token = jwt.sign(
            { id: admin._id, username: admin.username },
            JWT_SECRET,
            { expiresIn: '1d' }
        );
        console.log('JWT token created successfully');

        // Create response with token
        const response = NextResponse.json(
            { 
                message: 'Login successful',
                token: token // Include token in response
            },
            { status: 200 }
        );

        // Set cookie in the response
        response.cookies.set('auth-token', token, {
            httpOnly: true, // Prevent JavaScript access for security
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 86400 // 1 day in seconds
        });

        // Set headers to prevent caching
        response.headers.set('Cache-Control', 'no-store, max-age=0');
        response.headers.set('Pragma', 'no-cache');
        
        console.log('Setting auth-token cookie with token');

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
