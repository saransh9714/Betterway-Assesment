export default function ProductCard({ product, addToCart }) {
  return (
    <div className="card">
      <div className="card-image">
        <img src={product.image}/>
      </div>

      <h4>{product.title}</h4>
      <p className="price">$ {product.price}</p>
      <p className="category">{product.category}</p>
      <p className="stock">Stock: {product.stock}</p>

      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}
