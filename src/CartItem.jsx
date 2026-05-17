import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeItem } from "./CartSlice";

function CartItem({ onContinueShopping }) {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // ✅ Calculate total per item
  const calculateTotalCost = (item) => {
    return parseFloat(item.cost.substring(1)) * item.quantity;
  };

  // ✅ Calculate cart total
  const calculateTotalAmount = () => {
    let total = 0;

    cart.forEach((item) => {
      total += parseFloat(item.cost.substring(1)) * item.quantity;
    });

    return total.toFixed(2);
  };

  // ➕ Increase quantity
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1
      })
    );
  };

  // ➖ Decrease quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1
        })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // ❌ Remove item
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // 🛒 Checkout placeholder
  const handleCheckoutShopping = () => {
    alert("Functionality to be added for future reference");
  };

  return (
    <div className="cart-container">

      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="cart-item">

            <img src={item.image} alt={item.name} width="100" />

            <h3>{item.name}</h3>

            <p>Price: {item.cost}</p>

            <p>Quantity: {item.quantity}</p>

            <p>Subtotal: ${calculateTotalCost(item)}</p>

            <div>
              <button onClick={() => handleIncrement(item)}>+</button>

              <button onClick={() => handleDecrement(item)}>-</button>

              <button onClick={() => handleRemove(item)}>Remove</button>
            </div>

          </div>
        ))
      )}

      <h2>Total: ${calculateTotalAmount()}</h2>

      <button onClick={onContinueShopping}>
        Continue Shopping
      </button>

      <button onClick={handleCheckoutShopping}>
        Checkout
      </button>

    </div>
  );
}

export default CartItem;