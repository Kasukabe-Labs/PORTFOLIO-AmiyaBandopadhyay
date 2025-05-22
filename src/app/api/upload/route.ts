import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import Image from '@/models/Image';
import connectDB from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to verify JWT token
const verifyToken = async (request: Request) => {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
        throw new Error('No token provided');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        return decoded;
    } catch (err) {
        console.error('Token verification failed:', err);
        throw new Error('Invalid token');
    }
};

export async function POST(req: Request) {
    try {
        // Verify authentication
        const decoded = await verifyToken(req);

        const formData = await req.formData();
        const file = formData.get('file') as File;
        const title = formData.get('title') as string;
        const category = formData.get('category') as string;
        const date = formData.get('date') as string;
        console.log('Received date from form:', date);

        if (!file || !title || !category || !date) {
            return NextResponse.json(
                { message: 'Missing required fields: file, title, category, or date' },
                { status: 400 }
            );
        }

        // Validate category
        if (!['Awards', 'Events', 'Training'].includes(category)) {
            return NextResponse.json(
                { message: 'Invalid category. Must be one of: Awards, Events, Training' },
                { status: 400 }
            );
        }

        // Get file data
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Validate file type
        const contentType = file.type;
        if (!contentType.startsWith('image/')) {
            return NextResponse.json(
                { message: 'File must be an image' },
                { status: 400 }
            );
        }

        // Here you would typically:
        // 1. Upload the file to a cloud storage service (e.g., Cloudinary, AWS S3)
        // 2. Get the URL of the uploaded file
        // Connect to database
        await connectDB();

        // Parse the date and ensure it's set to midnight UTC
        const parsedDate = new Date(date + 'T00:00:00.000Z');
        console.log('Parsed date:', parsedDate);

        console.log('Creating image with date:', parsedDate);

        const image = await Image.create({
            title,
            data: buffer,
            contentType,
            category,
            date: parsedDate,
            uploadedBy: decoded.id
        });

        return NextResponse.json(
            { message: 'Image uploaded successfully', image },
            { status: 200 }
        );
    } catch (error) {
        console.error('Upload error:', error);
        if (error instanceof Error && error.message === 'No token provided') {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
