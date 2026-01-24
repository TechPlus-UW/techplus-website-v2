import { supabase } from '../supabase/client';

export interface EventData {
  id: string;
  title: string;
  description: string | null;
  start_time: string;
  end_time: string;
  location: string | null;
  event_type: 'workshop' | 'social' | 'mentorship' | 'coffee_chat' | 'other';
  registration_required: boolean;
  registration_link: string | null;
  max_attendees: number | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

class EventRepository {
  async getAllEvents(): Promise<EventData[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('start_time', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data as EventData[];
  }

  async getEventsByType(eventType: string): Promise<EventData[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('event_type', eventType)
      .order('start_time', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data as EventData[];
  }

  async getPastEvents(): Promise<EventData[]> {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .lt('end_time', now)
      .order('start_time', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data as EventData[];
  }

  async getUpcomingEvents(): Promise<EventData[]> {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('start_time', now)
      .order('start_time', { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return data as EventData[];
  }
}

export const eventRepository = new EventRepository();
