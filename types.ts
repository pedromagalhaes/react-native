export interface Entity {
  id: number;
  entity_name: string;
  image_url: string;
  short_description: string;
  rating: string;
  reviews: string;
  category: {
    category_name: string;
  };
  location: {
    location_name: string;
  };
}

export interface Service {
  id: number;
  service_name: string;
  short_description: string;
  image_url: string;
  entity: {
    id: number;
    entity_name: string;
  };
  status: {
    id: number;
    name: string;
  };
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  created_at: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  entity: {
    id: number;
    entity_name: string;
    contact_info: string;
    image_url: string;
    short_description: string;
    url: string;
  };
}

export interface Event {
  id: number;
  event_name: string;
  image_url: string;
  date: string;
  location: string;
  description: string;
}

export interface Category {
  id: number;
  category_name: string;
  image: string;
}

export interface Location {
  id: number;
  location_name: string;
  address: string | null;
  image: string;
}
