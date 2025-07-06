export interface BusinessFormData {
  name: string;
  location: string;
}

export interface BusinessData extends BusinessFormData {
  rating: number;
  reviews: number;
  headline: string;
}