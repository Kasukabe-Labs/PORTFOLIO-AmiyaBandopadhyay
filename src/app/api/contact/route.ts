import { NextResponse } from 'next/server';
import Contact from '@/models/Contact';
import connectDB from '@/lib/db';

export async function POST(request: Request) {
  try {
    await connectDB();
    const { name, email, phone, subject, message } = await request.json();

    // Basic validation
    if (!name || !email || !phone || !subject || !message) {
      return new NextResponse('All fields are required', { status: 400 });
    }

    // Create new contact submission
    const contact = new Contact({
      name,
      email,
      phone,
      subject,
      message,
    });

    await contact.save();

    return NextResponse.json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error saving contact form:', error);
    return new NextResponse('Error sending message', { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    await connectDB();
    // Check for authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return new NextResponse('Error fetching contacts', { status: 500 });
  }
}
