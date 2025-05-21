import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Trash2, Upload, LogOut } from 'lucide-react';

const Dashboard = () => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Awards');
  const navigate = useNavigate();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching images:', error);
    } else {
      setImages(data || []);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    setUploading(true);

    try {
      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('gallery')
        .insert([
          {
            title,
            category,
            image: publicUrl,
          },
        ]);

      if (dbError) throw dbError;

      fetchImages();
      setTitle('');
      setCategory('Awards');
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, imagePath: string) => {
    try {
      const fileName = imagePath.split('/').pop();
      
      await supabase.storage
        .from('gallery')
        .remove([fileName]);

      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);

      if (error) throw error;

      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Gallery Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Image</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Image Title"
              className="p-2 border rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <select
              className="p-2 border rounded-md"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Awards">Awards</option>
              <option value="Events">Events</option>
              <option value="Training">Training</option>
            </select>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="imageUpload"
                disabled={uploading}
              />
              <label
                htmlFor="imageUpload"
                className="flex items-center justify-center w-full p-2 bg-[#005DA6] text-white rounded-md cursor-pointer hover:bg-[#004a85] transition-colors"
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploading ? 'Uploading...' : 'Upload Image'}
              </label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((image: any) => (
            <div key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={image.image}
                alt={image.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{image.category}</p>
                <button
                  onClick={() => handleDelete(image.id, image.image)}
                  className="flex items-center text-red-500 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;