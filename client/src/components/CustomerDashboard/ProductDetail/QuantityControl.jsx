import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const QuantityControl = ({ onQuantityChange }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);  // Gọi hàm callback để truyền giá trị về component cha
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);  // Gọi hàm callback khi giảm giá trị
    }
  };

  return (
    <div className="quantity">
      
      <button className="minus" onClick={handleDecrease}>
        <Minus size={20} />
      </button>
      <div className="quantity-number">{quantity}</div>
      <button className='plus' onClick={handleIncrease}>
        <Plus size={20} />
      </button>
    </div>
  );
};

export default QuantityControl;
