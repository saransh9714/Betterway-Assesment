import { useEffect, useMemo, useState } from "react";
import Filters from "./components/Filters";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");

  const [tempSearch, setTempSearch] = useState("");
  const [tempCategory, setTempCategory] = useState("all");
  const [tempSort, setTempSort] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data =>
        setProducts(
          data.map(p => ({
            ...p,
            stock: Math.floor(Math.random() * 5) + 1
          }))
        )
      );
  }, []);

  const applyFilters = () => {
    setSearch(tempSearch);
    setCategory(tempCategory);
    setSort(tempSort);
  };

  const clearFilters = () => {
    setTempSearch("");
    setTempCategory("all");
    setTempSort("");
    setSearch("");
    setCategory("all");
    setSort("");
  };

  const clearCart = () => {
    setCart({});
  };

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (search) {
      list = list.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "all") {
      list = list.filter(p => p.category === category);
    }

    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);

    return list;
  }, [products, search, category, sort]);

  const addToCart = product => {
    setCart(prev => {
      const qty = prev[product.id]?.qty || 0;
      if (qty >= product.stock) return prev;

      return {
        ...prev,
        [product.id]: { product, qty: qty + 1 }
      };
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev => {
      const item = prev[id];
      if (!item) return prev;

      const newQty = item.qty + delta;
      if (newQty <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }

      if (newQty > item.product.stock) return prev;

      return {
        ...prev,
        [id]: { ...item, qty: newQty }
      };
    });
  };

  return (
    <div className="container">
      <h2 className="title center">Saransh's Mart</h2>

      <Filters
        products={products}
        tempSearch={tempSearch}
        tempCategory={tempCategory}
        tempSort={tempSort}
        setTempSearch={setTempSearch}
        setTempCategory={setTempCategory}
        setTempSort={setTempSort}
        applyFilters={applyFilters}
        clearFilters={clearFilters}
      />

      <div className="content">
        <ProductList
          products={filteredProducts}
          addToCart={addToCart}
        />

        <Cart
          cart={cart}
          updateQty={updateQty}
          clearCart={clearCart}
        />
      </div>
    </div>
  );
}