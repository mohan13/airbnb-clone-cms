export type Product = {
  image: string;
  name: string;
  category: string;
  price: number;
  sold: number;
  profit: number;
};

export interface Rooms {
  id: string;
  title: string;
  roomDescription: string;
  roomType: string;
  location: Location;
  price_per_night: number;
  currency: 'USD' | 'Rs.' | 'Deram';
  availability: Availability;
  amenities: string[];
  roomImages: string[];
  User: Host;
}

interface Host {
  id: string;
  name: string;
}

export interface Location {
  address: string;
  city: string;
  state: string;
  country: string;
}

interface Availability {
  start_date: string; // ISO Date format
  end_date: string; // ISO Date format
  is_available: boolean;
}
