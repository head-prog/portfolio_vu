/*
  # Fix guest profile access

  1. Security Updates
    - Update RLS policies to allow public access to view portfolio data
    - Allow guests to view projects, user profiles, and education entries
    - Maintain security for write operations (authenticated users only)
  
  2. Changes
    - Add public read access to projects table
    - Add public read access to user_profile table  
    - Add public read access to education_entries table
    - Add public read access to portfolio_data table
    - Keep write operations restricted to authenticated users
*/

-- Update projects table policies to allow public read access
DROP POLICY IF EXISTS "Public can view active projects" ON public.projects;
CREATE POLICY "Public can view active projects" ON public.projects
FOR SELECT TO public USING (is_active = true);

-- Update user_profile table policies to allow public read access
DROP POLICY IF EXISTS "Anyone can view user profile" ON public.user_profile;
CREATE POLICY "Anyone can view user profile" ON public.user_profile
FOR SELECT TO public USING (true);

-- Update education_entries table policies to allow public read access
DROP POLICY IF EXISTS "Anyone can view education entries" ON public.education_entries;
CREATE POLICY "Anyone can view education entries" ON public.education_entries
FOR SELECT TO public USING (is_active = true);

-- Update portfolio_data table policies to allow public read access
DROP POLICY IF EXISTS "Anyone can view portfolio data" ON public.portfolio_data;
CREATE POLICY "Anyone can view portfolio data" ON public.portfolio_data
FOR SELECT TO public USING (true);

-- Update portfolio_content table policies to allow public read access
DROP POLICY IF EXISTS "Anyone can view portfolio content" ON public.portfolio_content;
CREATE POLICY "Anyone can view portfolio content" ON public.portfolio_content
FOR SELECT TO public USING (true);

-- Update project_categories table policies to allow public read access
DROP POLICY IF EXISTS "Anyone can view categories" ON public.project_categories;
CREATE POLICY "Anyone can view categories" ON public.project_categories
FOR SELECT TO public USING (is_active = true);

-- Update project_tags table policies to allow public read access
DROP POLICY IF EXISTS "Anyone can view tags" ON public.project_tags;
CREATE POLICY "Anyone can view tags" ON public.project_tags
FOR SELECT TO public USING (true);

-- Update project_tag_relations table policies to allow public read access
DROP POLICY IF EXISTS "Anyone can view tag relations" ON public.project_tag_relations;
CREATE POLICY "Anyone can view tag relations" ON public.project_tag_relations
FOR SELECT TO public USING (true);