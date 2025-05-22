import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import ImageModel from '@/models/Image'; // replace with your model

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const id = request.nextUrl.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID not provided' }, { status: 400 });
    }

    const image = await ImageModel.findById(id);

    if (!image) {
      return NextResponse.json({ success: false, message: 'Image not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: image });
  } catch (error) {
    console.error('Error fetching image:', error);
    return NextResponse.json({ success: false, message: 'Error fetching image' }, { status: 500 });
  }
}
