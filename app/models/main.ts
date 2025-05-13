interface ProductImage {
  id: number;
  thumbnail: any;
  image: any;
}

export interface Product {
  id: number;
  images: ProductImage[];
  title: string;
  price: number;
  description: string;
  company: string;
  discount: number;
}

export interface CartItem {
  quantity: number;
  productId: number;
}
