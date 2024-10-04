import React, { useEffect } from 'react';
import { Row, Col, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../../api/API_Category';
import { useNavigate } from 'react-router-dom'; // Sử dụng useNavigate để điều hướng

const { Meta } = Card;

function AdminCategory() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const navigate = useNavigate(); // Khai báo useNavigate để điều hướng

  useEffect(() => {
    getCategories(dispatch);
  },[dispatch]);

  // Hàm xử lý khi nhấn vào Card
  const handleCardClick = (categoryId) => {
    navigate(`/admin/product/${categoryId}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={[16, 16]} justify="start"> 
        {categories.map((category) => (
          <Col key={category._id} span={6}>
            <Card
              hoverable
              style={{ width: '100%' }}
              cover={<img alt={category.category_name} src={`${category.images[0]?.url}`} className="category-image" />}
              onClick={() => handleCardClick(category.category_id)} // Gọi hàm khi  nhấn vào Card
            >
              <Meta title={category.category_name} description={`Mã danh mục: ${category.category_id}`} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default AdminCategory;
