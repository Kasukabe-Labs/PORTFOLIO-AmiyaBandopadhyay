import { NextRequest, NextResponse } from 'next/server';
import Image from '@/models/Image';
import connectDB from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const id = request.nextUrl.pathname.split('/').pop();
        if (!id) return NextResponse.json({ success: false, message: 'No ID provided' }, { status: 400 });

        const image = await Image.findById(id);
        if (!image) return new NextResponse('Image not found', { status: 404 });

        const response = new NextResponse(image.data);
        response.headers.set('Content-Type', image.contentType);
        return response;

    } catch (error) {
        console.error('Error fetching image:', error);
        return new NextResponse('Error fetching image', { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        await connectDB();

        const id = request.nextUrl.pathname.split('/').pop();
        if (!id) return NextResponse.json({ success: false, message: 'No ID provided' }, { status: 400 });

        const { title, category, date } = await request.json();

        const updatedImage = await Image.findByIdAndUpdate(
            id,
            { title, category, date: new Date(date) },
            { new: true }
        );

        if (!updatedImage) return new NextResponse('Image not found', { status: 404 });

        return NextResponse.json(updatedImage);

    } catch (error) {
        console.error('Error updating image:', error);
        return new NextResponse('Error updating image', { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        await connectDB();

        const id = request.nextUrl.pathname.split('/').pop();
        if (!id) return NextResponse.json({ success: false, message: 'No ID provided' }, { status: 400 });

        const deletedImage = await Image.findByIdAndDelete(id);
        if (!deletedImage) return new NextResponse('Image not found', { status: 404 });

        return new NextResponse('Image deleted successfully', { status: 200 });

    } catch (error) {
        console.error('Error deleting image:', error);
        return new NextResponse('Error deleting image', { status: 500 });
    }
}
