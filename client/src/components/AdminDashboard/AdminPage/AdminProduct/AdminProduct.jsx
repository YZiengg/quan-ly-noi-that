import React from 'react';
import { Button } from 'antd';

const AdminProduct = ({ onCreateProductClick }) => {
  return (
    <div>
      <h2>Danh sách sản phẩm</h2>
      <Button type="primary" onClick={onCreateProductClick}>
        Tạo sản phẩm
      </Button>
      {/* Hiển thị danh sách sản phẩm ở đây */}
    </div>
  );
};

export default AdminProduct;
