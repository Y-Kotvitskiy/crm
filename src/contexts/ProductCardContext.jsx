import { createContext, useState } from "react";

const ProductCardContext = createContext();

export const ProductCardProvider = ({ children }) => {
  const [productCard, setProductCard] = useState({});
  return (
    <ProductCardContext.Provider value={{ productCard, setProductCard }}>
      {children}
    </ProductCardContext.Provider>
  );
};

export default ProductCardContext;

