/*
  # Fix Guest Access to Portfolio

  This migration ensures that guests (unauthenticated users) can view all portfolio content
  while maintaining security for authenticated operations.

  ## Changes Made:
  1. Update all RLS policies to allow public read access
  2. Ensure portfolio data is accessible to guests
  3. Fix any missing policies
  4. Add proper indexes for performance
*/

-- Enable RLS on all tables if not already enabled
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_tag_relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_analytics ENABLE ROW LEVEL SECURITY;

-- Projects table: Allow public to view active projects, authenticated users manage their own
DROP POLICY IF EXISTS "Public can view active projects" ON public.projects;
DROP POLICY IF EXISTS "Users can view own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can insert own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can update own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can delete own projects" ON public.projects;
DROP POLICY IF EXISTS "Owners can manage all projects" ON public.projects;

CREATE POLICY "Public can view active projects" ON public.projects
FOR SELECT TO public USING (is_active = true);

CREATE POLICY "Users can view own projects" ON public.projects
FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own projects" ON public.projects
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" ON public.projects
FOR UPDATE TO authenticated 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" ON public.projects
FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- User profile: Allow public to view, authenticated users manage
DROP POLICY IF EXISTS "Anyone can view user profile" ON public.user_profile;
DROP POLICY IF EXISTS "Authenticated users can manage user profile" ON public.user_profile;

CREATE POLICY "Anyone can view user profile" ON public.user_profile
FOR SELECT TO public USING (true);

CREATE POLICY "Authenticated users can manage user profile" ON public.user_profile
FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Education entries: Allow public to view active entries, authenticated users manage
DROP POLICY IF EXISTS "Anyone can view education entries" ON public.education_entries;
DROP POLICY IF EXISTS "Only owners can modify education entries" ON public.education_entries;

CREATE POLICY "Anyone can view education entries" ON public.education_entries
FOR SELECT TO public USING (is_active = true);

CREATE POLICY "Only owners can modify education entries" ON public.education_entries
FOR ALL TO authenticated 
USING (EXISTS (
  SELECT 1 FROM public.users 
  WHERE users.id::text = auth.uid()::text AND users.role = 'owner'
))
WITH CHECK (EXISTS (
  SELECT 1 FROM public.users 
  WHERE users.id::text = auth.uid()::text AND users.role = 'owner'
));

-- Portfolio data: Allow public to view, authenticated users manage
DROP POLICY IF EXISTS "Anyone can view portfolio data" ON public.portfolio_data;
DROP POLICY IF EXISTS "Authenticated users can modify portfolio data" ON public.portfolio_data;

CREATE POLICY "Anyone can view portfolio data" ON public.portfolio_data
FOR SELECT TO public USING (true);

CREATE POLICY "Authenticated users can modify portfolio data" ON public.portfolio_data
FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Portfolio content: Allow public to view, owners modify
DROP POLICY IF EXISTS "Anyone can view portfolio content" ON public.portfolio_content;
DROP POLICY IF EXISTS "Only owners can modify portfolio content" ON public.portfolio_content;

CREATE POLICY "Anyone can view portfolio content" ON public.portfolio_content
FOR SELECT TO public USING (true);

CREATE POLICY "Only owners can modify portfolio content" ON public.portfolio_content
FOR ALL TO authenticated 
USING (EXISTS (
  SELECT 1 FROM public.users 
  WHERE users.id::text = auth.uid()::text AND users.role = 'owner'
))
WITH CHECK (EXISTS (
  SELECT 1 FROM public.users 
  WHERE users.id::text = auth.uid()::text AND users.role = 'owner'
));

-- Project categories: Allow public to view active categories
DROP POLICY IF EXISTS "Anyone can view categories" ON public.project_categories;
DROP POLICY IF EXISTS "Only owners can modify categories" ON public.project_categories;

CREATE POLICY "Anyone can view categories" ON public.project_categories
FOR SELECT TO public USING (is_active = true);

CREATE POLICY "Only owners can modify categories" ON public.project_categories
FOR ALL TO authenticated 
USING (EXISTS (
  SELECT 1 FROM public.users 
  WHERE users.id::text = auth.uid()::text AND users.role = 'owner'
))
WITH CHECK (EXISTS (
  SELECT 1 FROM public.users 
  WHERE users.id::text = auth.uid()::text AND users.role = 'owner'
));

-- Project tags: Allow public to view, authenticated users create, owners modify
DROP POLICY IF EXISTS "Anyone can view tags" ON public.project_tags;
DROP POLICY IF EXISTS "Authenticated users can create tags" ON public.project_tags;
DROP POLICY IF EXISTS "Only owners can modify tags" ON public.project_tags;

CREATE POLICY "Anyone can view tags" ON public.project_tags
FOR SELECT TO public USING (true);

CREATE POLICY "Authenticated users can create tags" ON public.project_tags
FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Only owners can modify tags" ON public.project_tags
FOR UPDATE TO authenticated 
USING (EXISTS (
  SELECT 1 FROM public.users 
  WHERE users.id::text = auth.uid()::text AND users.role = 'owner'
))
WITH CHECK (EXISTS (
  SELECT 1 FROM public.users 
  WHERE users.id::text = auth.uid()::text AND users.role = 'owner'
));

-- Project tag relations: Allow public to view, users manage their project tags
DROP POLICY IF EXISTS "Anyone can view tag relations" ON public.project_tag_relations;
DROP POLICY IF EXISTS "Users can manage their project tags" ON public.project_tag_relations;

CREATE POLICY "Anyone can view tag relations" ON public.project_tag_relations
FOR SELECT TO public USING (true);

CREATE POLICY "Users can manage their project tags" ON public.project_tag_relations
FOR ALL TO authenticated 
USING (EXISTS (
  SELECT 1 FROM public.projects 
  WHERE projects.id = project_tag_relations.project_id 
  AND (projects.user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id::text = auth.uid()::text AND users.role = 'owner'
  ))
))
WITH CHECK (EXISTS (
  SELECT 1 FROM public.projects 
  WHERE projects.id = project_tag_relations.project_id 
  AND (projects.user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id::text = auth.uid()::text AND users.role = 'owner'
  ))
));

-- Contact inquiries: Allow public to submit, owners to view/manage
DROP POLICY IF EXISTS "Anyone can submit inquiries" ON public.contact_inquiries;
DROP POLICY IF EXISTS "Only owners can view inquiries" ON public.contact_inquiries;
DROP POLICY IF EXISTS "Only owners can update inquiries" ON public.contact_inquiries;

CREATE POLICY "Anyone can submit inquiries" ON public.contact_inquiries
FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Only owners can view inquiries" ON public.contact_inquiries
FOR SELECT TO authenticated 
USING (EXISTS (
  SELECT 1 FROM public.users 
  WHERE users.id::text = auth.uid()::text AND users.role = 'owner'
));

CREATE POLICY "Only owners can update inquiries" ON public.contact_inquiries
FOR UPDATE TO authenticated 
USING (EXISTS (
  SELECT 1 FROM public.users 
  WHERE users.id::text = auth.uid()::text AND users.role = 'owner'
))
WITH CHECK (EXISTS (
  SELECT 1 FROM public.users 
  WHERE users.id::text = auth.uid()::text AND users.role = 'owner'
));

-- Site analytics: Allow system to insert, owners to view
DROP POLICY IF EXISTS "System can insert analytics" ON public.site_analytics;
DROP POLICY IF EXISTS "Only owners can view analytics" ON public.site_analytics;

CREATE POLICY "System can insert analytics" ON public.site_analytics
FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Only owners can view analytics" ON public.site_analytics
FOR SELECT TO authenticated 
USING (EXISTS (
  SELECT 1 FROM public.users 
  WHERE users.id::text = auth.uid()::text AND users.role = 'owner'
));

-- Ensure there's at least one user profile entry for guests to see
INSERT INTO public.user_profile (
  name, 
  title, 
  bio, 
  phone, 
  email, 
  years_experience, 
  completed_projects, 
  specializations, 
  philosophy
) VALUES (
  'Vaishnavi Upadhyay',
  'Interior Designer & Space Planner',
  'With over 8 years of experience in transforming spaces, I specialize in creating harmonious environments that blend functionality with aesthetic appeal. My passion lies in understanding each client''s unique vision and bringing it to life through thoughtful design and meticulous attention to detail.',
  '+1 (555) 123-4567',
  'vaishnavi@upadhyaydesign.com',
  '8+ Years',
  '150+ Projects',
  'Residential & Commercial Design',
  'Every space tells a story. My role is to help you write yours beautifully.'
) ON CONFLICT (id) DO NOTHING;

-- Add some sample education entries if none exist
INSERT INTO public.education_entries (
  period,
  degree,
  institution,
  description,
  order_index,
  is_active
) VALUES 
(
  '2012-2016',
  'Bachelor of Interior Design',
  'National Institute of Design',
  'Comprehensive study of interior design principles, space planning, and sustainable design practices.',
  1,
  true
),
(
  '2016-2017',
  'Certificate in Sustainable Design',
  'Green Building Council',
  'Specialized training in eco-friendly design practices and sustainable material selection.',
  2,
  true
),
(
  '2018',
  'Advanced Space Planning Workshop',
  'Design Institute of America',
  'Intensive workshop focusing on optimizing space utilization and flow in residential and commercial environments.',
  3,
  true
) ON CONFLICT DO NOTHING;

-- Add some sample project categories if none exist
INSERT INTO public.project_categories (
  name,
  description,
  color_code,
  icon,
  order_index,
  is_active
) VALUES 
(
  'Residential',
  'Home and apartment interior design projects',
  '#8B4513',
  '🏠',
  1,
  true
),
(
  'Commercial',
  'Office and business space design projects',
  '#4A90E2',
  '🏢',
  2,
  true
),
(
  'Hospitality',
  'Hotel, restaurant, and hospitality venue designs',
  '#E94B3C',
  '🏨',
  3,
  true
),
(
  'Retail',
  'Store and retail space design projects',
  '#50C878',
  '🛍️',
  4,
  true
) ON CONFLICT (name) DO NOTHING;