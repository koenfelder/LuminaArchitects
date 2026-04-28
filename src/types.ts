export interface Project {
  id: string;
  title: string;
  year: string;
  location: string;
  description: string;
  role: string;
  imageUrl?: string;
}

export interface Service {
  title: string;
  description: string;
}
