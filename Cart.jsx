export default function Cart({ cart, updateQty, clearCart }) {
  const items = Object.values(cart);

  const total = items.reduce(
    (sum, i) => sum + i.qty * i.product.price,
    0
  );

  return (
    <div className="cart">
      <div className="cart-header">
        <h3>🛒 Your Cart</h3>
        {items.length > 0 && (
          <button className="clear-cart" onClick={clearCart}>
            Clear
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty</p>
          <span>Add items to see them here</span>
        </div>
      ) : (
        <>
          {items.map(({ product, qty }) => (
            <div key={product.id} className="cart-item">
              <img src={product.image} alt={product.title} />

              <div className="cart-info">
                <p>{product.title}</p>
                <span>₹ {product.price}</span>
              </div>

              <div className="cart-controls">
                <button onClick={() => updateQty(product.id, -1)}>-</button>
                <span>{qty}</span>
                <button onClick={() => updateQty(product.id, 1)}>+</button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            Total: $ {total.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
}