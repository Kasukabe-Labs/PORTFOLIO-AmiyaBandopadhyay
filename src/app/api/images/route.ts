import { NextResponse } from 'next/server';
import Image from '@/models/Image';
import connectDB from '@/lib/db';

export async function GET() {
    try {
        await connectDB();

        // Fetch all images, sorted by date field (newest first)
        const images = await Image.find()
            .sort({ date: -1 })
            .select('_id title category date');

        return NextResponse.json({ images }, { status: 200 });
    } catch (error) {
        console.error('Error fetching images:', error);
        return NextResponse.json(
            { message: 'Error fetching images' },
            { status: 500 }
        );
    }
}
