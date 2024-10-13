import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './product.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProductByCategory } from '../../../../api/API_Product';
import { useParams } from 'react-router-dom';
import NotificationMessage from '../../../Message/NotificationMessage';
const AdminProduct = ({ onCreateProductClick }) => {
  const initialProducts = useSelector((state) => state.categories.products);
  const msg = useSelector((state)=> state.products.msg);
  const dispatch = useDispatch();
  const { categoryId } = useParams(); // Lấy categoryId từ params
  const [products, setProducts] = useState(initialProducts)
  useEffect(() => {
    getProductByCategory(dispatch,categoryId);
  }, [dispatch]);

  useEffect(()=>{
    setProducts(initialProducts);
  },[initialProducts])

  const handleDelete = async (id) => {
    try {
      const res = await deleteProduct(dispatch, initialProducts._id, id);
      if(res.success = true){
        NotificationMessage.success(msg.message); // Thông báo thành công
      }
      getProductByCategory(dispatch,categoryId);
    } catch (error) {
        NotificationMessage.error(error.response?.data || 'Có lỗi xảy ra'); 
    }  
  };
  
  return (  
    <div className='content-container'>
       <div className='btn-container'>
        <Button type="primary" onClick={() => { onCreateProductClick(categoryId)}}>
          Tạo sản phẩm
        </Button>
       </div>

        <div className='product-container'>
          {products?.products.map(product => (
            <div className='product-item' key={product?.product_id}>
              <div className='product-img'>
                <img alt={product?.product_id} src={`${product?.images[0]?.url}`} className="category-image" />
              </div>
              <div className='product-content'>
                <div className='product-name'>{product?.product_name}</div>
                <div className='product-type'>Phân loại hàng: {product?.productType}</div>
                <div className='product-quanty'>Kho: {product?.quantity}</div>
              </div>
              <div className='product-price'>{product?.price.toLocaleString()} VND</div>
              <div className='action'>
                <div>
                  <DeleteOutlined 
                    style={{ color: 'red', cursor: 'pointer' }} 
                    onClick={() => handleDelete(product?._id)} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default AdminProduct;
