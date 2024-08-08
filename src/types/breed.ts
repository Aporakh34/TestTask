export interface Breed {
  id: string;
  name: string;
  temperament?: string;
  weight?: {
    imperial: string;
    metric: string;
  };
  height?: {
    imperial: string;
    metric: string;
  };
  bred_for?: string;
  breed_group?: string;
  life_span: string;
  image?: {
    url: string;
  };
  reference_image_id?: string;
  country_code?: string;
  description?: string;
  origin?: string;
  wikipedia_url?: string;
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  dog_friendly: number;
  energy_level: number;
  grooming: number;
  health_issues: number;
  intelligence: number;
  shedding_level: number;
  social_needs: number;
  stranger_friendly: number;
  vetstreet_url?: string;
  vcahospitals_url?: string;
}
