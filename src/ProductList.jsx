import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "./CartSlice";
import "./ProductList.css";
import CartItem from "./CartItem";

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const dispatch = useDispatch();

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image:
            "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15",
        },
        {
          name: "Spider Plant",
          image:
            "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12",
        },
        {
          name: "Peace Lily",
          image:
            "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
          description: "Removes mold spores and purifies the air.",
          cost: "$18",
        },
      ],
    },
  ];

  const handleAddToCart = (product) => {
    dispatch(addItem(product));

    setAddedToCart((prev) => ({
      ...prev,
      [product.name]: true,
    }));
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const styleObj = {
    backgroundColor: "#4CAF50",
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "20px",
  };

  const styleA = {
    color: "white",
    fontSize: "20px",
    textDecoration: "none",
  };

  return (
    <div>
      {/* NAVBAR */}
      <div className="navbar" style={styleObj}>
        <a href="/" onClick={handleHomeClick} style={styleA}>
          Paradise Nursery
        </a>

        <a href="#" onClick={handleCartClick} style={styleA}>
          Cart
        </a>
      </div>

      {/* PRODUCT GRID */}
      {!showCart ? (
        <div className="product-grid">
  {plantsArray.map((category, index) => (
    <div key={index}>
      <h1>{category.category}</h1>

      <div className="product-list">
        {category.plants.map((plant, plantIndex) => (
          <div className="product-card" key={plantIndex}>
            
            <img
              src={plant.image}
              alt={plant.name}
              className="product-image"
            />

            <h3>{plant.name}</h3>
            <p>{plant.description}</p>
            <p>{plant.cost}</p>

            <button onClick={() => handleAddToCart(plant)}>
              Add to Cart
            </button>

          </div>
        ))}
      </div>
    </div>
  ))}
</div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;