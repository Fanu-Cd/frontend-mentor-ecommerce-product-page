"use client";

import { createContext, useContext, useState } from "react";
import product1Thumbnail from "../assets/image-product-1-thumbnail.jpg";
import product1Image from "../assets/image-product-1.jpg";
import product2Thumbnail from "../assets/image-product-2-thumbnail.jpg";
import product2Image from "../assets/image-product-2.jpg";
import product3Thumbnail from "../assets/image-product-3-thumbnail.jpg";
import product3Image from "../assets/image-product-3.jpg";
import product4Thumbnail from "../assets/image-product-4-thumbnail.jpg";
import product4Image from "../assets/image-product-4.jpg";
import { CartItem, Product } from "../models/main";
interface ContextType {
  products: Product[];
  itemsInCart: CartItem[];
  setItemsInCart: (items: CartItem[]) => void;
}
const ProductContext = createContext<ContextType>({
  products: [],
  itemsInCart: [],
  setItemsInCart: () => {},
});
export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products] = useState<Product[]>([
    {
      id: 1,
      images: [
        { id: 1, thumbnail: product1Thumbnail, image: product1Image },
        { id: 2, thumbnail: product2Thumbnail, image: product2Image },
        { id: 3, thumbnail: product3Thumbnail, image: product3Image },
        { id: 4, thumbnail: product4Thumbnail, image: product4Image },
      ],
      title: "Fall Limited Edition Sneakers",
      description: `These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.`,
      company: "SNEAKER COMPANY",
      price: 125,
      discount: 50,
    },
  ]);

  const [itemsInCart, setItemsInCart] = useState<CartItem[]>([]);

  return (
    <ProductContext.Provider value={{ products, itemsInCart, setItemsInCart }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};
