'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Trash2, Edit, Mail, Image as ImageIcon } from 'lucide-react';

interface GalleryItem {
    _id: string;
    title: string;
    url: string;
    category: string;
    date: string;
}

interface ContactForm {
    _id: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    createdAt: string;
}

type TabType = 'upload' | 'gallery' | 'contact';

export default function Dashboard() {
    // Tab state
    const [activeTab, setActiveTab] = useState<TabType>('gallery');
    const [isLoadingContacts, setIsLoadingContacts] = useState(false);

    // Upload form state
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Awards');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    // Gallery state
    const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(false);

    // Contact form state
    const [contactForms, setContactForms] = useState<ContactForm[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({
        title: '',
        category: 'Awards',
        date: ''
    });

    // Fetch gallery items
    useEffect(() => {
        if (activeTab === 'gallery') {
            fetchGalleryItems();
        } else if (activeTab === 'contact') {
            fetchContactForms();
        }
    }, [activeTab]);

    const fetchGalleryItems = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('auth-token');
            const response = await fetch('/api/images', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setGalleryItems(data.images || []);
            } else {
                toast.error(data.message || 'Failed to fetch gallery items');
            }
        } catch (err) {
            console.error('Error fetching gallery items:', err);
            toast.error('Failed to fetch gallery items');
        } finally {
            setLoading(false);
        }
    };

    const fetchContactForms = async () => {
        try {
            setIsLoadingContacts(true);
            const token = localStorage.getItem('auth-token');
            const response = await fetch('/api/contact', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setContactForms(Array.isArray(data) ? data : []);
            } else {
                toast.error(data.message || 'Failed to fetch contact forms');
            }
        } catch (err) {
            console.error('Error fetching contact forms:', err);
            toast.error('Failed to fetch contact forms');
        } finally {
            setIsLoadingContacts(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append('file', file);
            formData.append('title', title);
            formData.append('category', category);
            formData.append('date', date);

            const token = localStorage.getItem('auth-token');
            if (!token) {
                toast.error('Authentication token not found');
                return;
            }

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Image uploaded successfully!');
                setTitle('');
                setCategory('Awards');
                setDate(new Date().toISOString().split('T')[0]);
                setFile(null);
                fetchGalleryItems();
            } else {
                toast.error(data.message || 'Upload failed');
            }
        } catch (err) {
            console.error('Upload error:', err);
            toast.error('An error occurred while uploading');
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteImage = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this image?')) return;

        try {
            const token = localStorage.getItem('auth-token');
            const response = await fetch(`/api/images/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Image deleted successfully!');
                fetchGalleryItems();
            } else {
                toast.error(data.message || 'Failed to delete image');
            }
        } catch (err) {
            console.error('Delete error:', err);
            toast.error('An error occurred while deleting the image');
        }
    };

    const handleEditImage = (item: GalleryItem) => {
        setEditingId(item._id);
        setEditForm({
            title: item.title,
            category: item.category,
            date: item.date.split('T')[0]
        });
    };

    const handleUpdateImage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingId) return;

        try {
            const token = localStorage.getItem('auth-token');
            const response = await fetch(`/api/images/${editingId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editForm)
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Image updated successfully!');
                setEditingId(null);
                fetchGalleryItems();
            } else {
                toast.error(data.message || 'Update failed');
            }
        } catch (err) {
            console.error('Update error:', err);
            toast.error('An error occurred while updating the image');
        }
    };

    const handleDeleteContact = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this contact submission?')) {
            try {
                const response = await fetch(`/api/contact/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // Refresh the contact submissions list
                    const updatedForms = contactForms.filter(
                        (form) => form._id !== id
                    );
                    setContactForms(updatedForms);
                } else {
                    console.error('Failed to delete contact submission');
                }
            } catch (error) {
                console.error('Error deleting contact submission:', error);
            }
        }
    };

    // Tab navigation
    const renderTabContent = () => {
        switch (activeTab) {
            case 'upload':
                return (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-gray-800">Upload New Image</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Category
                                </label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
                                >
                                    <option value="Awards">Awards</option>
                                    <option value="Events">Events</option>
                                    <option value="Training">Training</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    required
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                    className="mt-1 block w-full text-gray-700 text-black"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={uploading}
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${uploading ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                {uploading ? 'Uploading...' : 'Upload Image'}
                            </button>
                        </form>
                    </div>
                );

            case 'gallery':
                return (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">Gallery Management</h2>
                            <button
                                onClick={() => setActiveTab('upload')}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-sm"
                            >
                                Add New Image
                            </button>
                        </div>

                        {loading ? (
                            <div className="text-center py-8">Loading gallery items...</div>
                        ) : galleryItems.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">No images found in the gallery.</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {galleryItems.map((item) => (
                                            <tr key={item._id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="h-20 w-20 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img
                                                            src={`/api/images/${item._id}`}
                                                            alt={item.title}
                                                            className="h-full w-full object-contain"
                                                        />
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {editingId === item._id ? (
                                                        <input
                                                            type="text"
                                                            value={editForm.title}
                                                            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                                            className="border rounded px-2 py-1 w-full"
                                                        />
                                                    ) : (
                                                        item.title
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {editingId === item._id ? (
                                                        <select
                                                            value={editForm.category}
                                                            onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                                            className="border rounded px-2 py-1 w-full"
                                                        >
                                                            <option value="Awards">Awards</option>
                                                            <option value="Events">Events</option>
                                                            <option value="Training">Training</option>
                                                        </select>
                                                    ) : (
                                                        item.category
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {editingId === item._id ? (
                                                        <input
                                                            type="date"
                                                            value={editForm.date}
                                                            onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                                                            className="border rounded px-2 py-1 w-full"
                                                        />
                                                    ) : (
                                                        new Date(item.date).toLocaleDateString()
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    {editingId === item._id ? (
                                                        <>
                                                            <button
                                                                onClick={handleUpdateImage}
                                                                className="text-green-600 hover:text-green-900 mr-3"
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                onClick={() => setEditingId(null)}
                                                                className="text-gray-600 hover:text-gray-900"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => handleEditImage(item)}
                                                                className="text-blue-600 hover:text-blue-900 mr-3"
                                                            >
                                                                <Edit className="h-4 w-4 inline" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteImage(item._id)}
                                                                className="text-red-600 hover:text-red-900"
                                                            >
                                                                <Trash2 className="h-4 w-4 inline" />
                                                            </button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                );

            case 'contact':
                return (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Contact Form Submissions</h2>

                        {isLoadingContacts ? (
                            <div className="text-center py-8">Loading contact submissions...</div>
                        ) : contactForms.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">No contact submissions found.</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {contactForms.map((submission) => (
                                            <tr key={submission._id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {submission.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <a href={`mailto:${submission.email}`} className="text-blue-600 hover:text-blue-900">
                                                        {submission.email}
                                                    </a>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {submission.phone}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900">
                                                    {submission.subject}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                                    {submission.message}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(submission.createdAt).toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button
                                                        onClick={() => handleDeleteContact(submission._id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow">
                    {/* Tabs */}
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-4" aria-label="Tabs">
                            <button
                                onClick={() => setActiveTab('gallery')}
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'gallery'
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center justify-center">
                                    <ImageIcon className="h-5 w-5 mr-2" />
                                    Gallery Management
                                </div>
                            </button>

                            <button
                                onClick={() => setActiveTab('contact')}
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'contact'
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center justify-center">
                                    <Mail className="h-5 w-5 mr-2" />
                                    Contact Forms ({contactForms?.length || 0})
                                </div>
                            </button>
                        </nav>
                    </div>

                    {/* Tab content */}
                    <div className="p-6">
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}
