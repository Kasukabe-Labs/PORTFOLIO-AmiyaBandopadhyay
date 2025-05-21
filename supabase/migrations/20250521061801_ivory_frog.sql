/*
  # Create gallery table for image management

  1. New Tables
    - `gallery`
      - `id` (uuid, primary key)
      - `title` (text)
      - `category` (text)
      - `image` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `gallery` table
    - Add policies for authenticated users to manage gallery items
*/

CREATE TABLE IF NOT EXISTS gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  image text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to select gallery items"
  ON gallery
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert gallery items"
  ON gallery
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update their gallery items"
  ON gallery
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete gallery items"
  ON gallery
  FOR DELETE
  TO authenticated
  USING (true);