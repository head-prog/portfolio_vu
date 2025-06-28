
import { supabase } from "@/integrations/supabase/client";

// Complete data persistence service for all editable content
export class PortfolioDataService {
  // Save any editable element to database
  static async saveElement(elementType: string, elementId: string, value: string | object) {
    try {
      const { data, error } = await supabase
        .from('portfolio_data')
        .upsert({
          element_type: elementType,
          element_id: elementId,
          element_value: typeof value === 'string' ? value : null,
          json_data: typeof value === 'object' ? value : null,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to save element:', error);
      throw error;
    }
  }

  // Load all portfolio data
  static async loadAllData() {
    try {
      const { data, error } = await supabase
        .from('portfolio_data')
        .select('*');

      if (error) throw error;
      
      const dataMap = new Map();
      data?.forEach(item => {
        const value = item.json_data || item.element_value;
        dataMap.set(`${item.element_type}_${item.element_id}`, value);
      });

      return dataMap;
    } catch (error) {
      console.error('Failed to load portfolio data:', error);
      return new Map();
    }
  }

  // Upload image to storage and save URL
  static async uploadImage(file: File, elementId: string) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${elementId}/${Date.now()}-${Math.random()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(uploadData.path);

      // Save URL to database
      await this.saveElement('image', elementId, publicUrl);
      
      return publicUrl;
    } catch (error) {
      console.error('Failed to upload image:', error);
      throw error;
    }
  }
}

// User profile service
export class UserProfileService {
  static async loadProfile() {
    try {
      const { data, error } = await supabase
        .from('user_profile')
        .select('*')
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to load user profile:', error);
      return null;
    }
  }

  static async updateProfile(updates: any) {
    try {
      const { data, error } = await supabase
        .from('user_profile')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', (await this.loadProfile())?.id);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  }
}

// Projects service with complete persistence
export class ProjectsService {
  static async loadAllProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to load projects:', error);
      return [];
    }
  }

  static async saveProject(project: any) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .upsert({
          ...project,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to save project:', error);
      throw error;
    }
  }

  static async deleteProject(projectId: string) {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ is_active: false })
        .eq('id', projectId);

      if (error) throw error;
    } catch (error) {
      console.error('Failed to delete project:', error);
      throw error;
    }
  }
}
