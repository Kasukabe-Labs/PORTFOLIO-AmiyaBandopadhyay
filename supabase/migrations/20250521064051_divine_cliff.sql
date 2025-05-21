/*
  # Create storage bucket for gallery images

  1. Storage
    - Create 'gallery' bucket for storing images
    - Set up public access policy
*/

-- Enable storage by creating the bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true);

-- Set up storage policy to allow authenticated users to upload files
CREATE POLICY "Allow authenticated users to upload images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'gallery'
  AND owner = auth.uid()
);

-- Allow authenticated users to update their own files
CREATE POLICY "Allow authenticated users to update their images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'gallery'
  AND owner = auth.uid()
)
WITH CHECK (
  bucket_id = 'gallery'
  AND owner = auth.uid()
);

-- Allow authenticated users to delete their own files
CREATE POLICY "Allow authenticated users to delete their images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'gallery'
  AND owner = auth.uid()
);

-- Allow public read access to all files
CREATE POLICY "Allow public read access to gallery images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'gallery');