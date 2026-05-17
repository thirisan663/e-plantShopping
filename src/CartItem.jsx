import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity, removeItem } from "./CartSlice";
import "./CartItem.css";

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();

  // get cart items from Redux store
  const cart = useSelector((state) => state.cart.items);

  // ✅ total cost of all items
  const calculateTotalAmount = () => {
    let total = 0;

    cart.forEach((item) => {
      const price = parseFloat(item.cost.substring(1)); // remove $
      total += price * item.quantity;
    });

    return total.toFixed(2);
  };

  // ✅ subtotal for one item
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.substring(1));
    return (price * item.quantity).toFixed(2);
  };

  // ✅ increase quantity
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  // ✅ decrease quantity OR remove
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // ✅ remove item
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // ✅ continue shopping
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  // ✅ checkout (future feature)
  const handleCheckoutShopping = () => {
    alert("Functionality to be added for future reference");
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <h3>Your cart is empty</h3>
      ) : (
        <>
          {cart.map((item, index) => (
            <div className="cart-item" key={index}>
              <img src={item.image} alt={item.name} className="cart-image" />

              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>Price: {item.cost}</p>

                <p>
                  Subtotal: ${calculateTotalCost(item)}
                </p>

                <div className="quantity-controls">
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => handleRemove(item)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h2 className="total">
            Total: ${calculateTotalAmount()}
          </h2>

          <div className="cart-actions">
            <button onClick={handleContinueShopping}>
              Continue Shopping
            </button>

            <button onClick={handleCheckoutShopping}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartItem;