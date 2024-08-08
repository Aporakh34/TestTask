export interface Cat {
  id: string;
  name: string;
  origin?: string;
  image?: {
    url: string;
  };
}

export interface Dog {
  id: string;
  name: string;
  breed_group?: string;
  image?: {
    url: string;
  };
}
