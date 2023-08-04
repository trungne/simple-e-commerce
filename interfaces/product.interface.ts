export interface Product {
  id: string;

  name: string;
  description: string;

  price: number;
  quantity: number;

  image: string;

  category: string;
}

export interface ProductQuery {
  category?: string;
}
